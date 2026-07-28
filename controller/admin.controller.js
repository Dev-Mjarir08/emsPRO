import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import Task from "../models/task.model.js";
import Payroll from "../models/payroll.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminController = {

    homePage(req, res) {
        return res.render('index');
    },

    loginpage(req, res) {
        return res.render('pages/admin/login');
    },

    async dashboard(req, res) {
        try {
            const totalEmp = await User.countDocuments({ role: "employee" });
            const totalHR = await User.countDocuments({ role: "hr" });
            const totalDpt = await Department.countDocuments({});
            const totalTasks = await Task.countDocuments({});

            const revenueAgg = await Task.aggregate([
                { $group: { _id: null, total: { $sum: "$price" } } }
            ]);
            const totalProjectRevenue = revenueAgg[0]?.total || 0;

            const payrollBudgetAgg = await User.aggregate([
                { $match: { role: { $in: ["employee", "hr"] } } },
                { $group: { _id: null, total: { $sum: "$salary" } } }
            ]);
            const totalMonthlySalaryBudget = payrollBudgetAgg[0]?.total || 0;

            const paidPayrollAgg = await Payroll.aggregate([
                { $match: { status: "Paid" } },
                { $group: { _id: null, total: { $sum: "$netSalary" } } }
            ]);
            const totalPaidSalary = paidPayrollAgg[0]?.total || 0;

            const pendingPayrollAgg = await Payroll.aggregate([
                { $match: { status: "Pending" } },
                { $group: { _id: null, total: { $sum: "$netSalary" } } }
            ]);
            const totalPendingSalary = pendingPayrollAgg[0]?.total || 0;

            const recentTasks = await Task.find()
                .populate("assignedTo", "name")
                .sort({ createdAt: -1 })
                .limit(5);

            const recentPayrolls = await Payroll.find()
                .populate("employee", "name role")
                .sort({ createdAt: -1 })
                .limit(5);

            return res.render('pages/admin/dashboard', {
                totalEmp,
                totalHR,
                totalDpt,
                totalTasks,
                totalProjectRevenue,
                totalMonthlySalaryBudget,
                totalPaidSalary,
                totalPendingSalary,
                recentTasks,
                recentPayrolls
            });
        } catch (error) {
            return res.render('pages/admin/dashboard', {
                totalEmp: 0,
                totalHR: 0,
                totalDpt: 0,
                totalTasks: 0,
                totalProjectRevenue: 0,
                totalMonthlySalaryBudget: 0,
                totalPaidSalary: 0,
                totalPendingSalary: 0,
                recentTasks: [],
                recentPayrolls: []
            });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                req.session.error_msg = "Invalid email address or password!";
                return res.redirect('/admin/login');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                req.session.error_msg = "Invalid email address or password!";
                return res.redirect('/admin/login');
            }

            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                'secret',
                { expiresIn: "7d" }
            );

            res.cookie("token", token, { httpOnly: true });
            req.session.success_msg = `Welcome back, ${user.name}! Signed in successfully.`;

            if (user.role === "admin") {
                return res.redirect('/admin/dashboard');
            } else if (user.role === "hr") {
                return res.redirect('/hr/dashboard');
            } else {
                return res.redirect('/emp/dashboard');
            }

        } catch (error) {
            req.session.error_msg = "An unexpected error occurred during sign in.";
            return res.redirect('/admin/login');
        }
    },

    // Employee Handlers
    async createEmpPage(req, res) {
        try {
            const dpt = await Department.find({});
            return res.render("pages/admin/create-employee", { dpt });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async createEmp(req, res) {
        try {
            if (req.file) {
                req.body.image = req.file.path;
            }
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            req.body.role = "employee";

            await User.create(req.body);
            req.session.success_msg = "Employee added successfully!";
            return res.redirect('/admin/view-emp');
        } catch (error) {
            req.session.error_msg = "Failed to create employee. Please try again.";
            return res.redirect(req.get('Referer') || '/admin/create-emp');
        }
    },

    async viewEmpPage(req, res) {
        try {
            const employee = await User.find({ role: "employee" }).populate("department");
            return res.render('pages/admin/view-employee', { employee });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async editEmpPage(req, res) {
        try {
            const employee = await User.findById(req.params.id).populate("department");
            const dpt = await Department.find({});
            return res.render("pages/admin/edit-employee", { employee, dpt });
        } catch (error) {
            return res.redirect('/admin/view-emp');
        }
    },

    async editEmp(req, res) {
        try {
            if (req.file) {
                req.body.image = req.file.path;
            }
            if (req.body.password && req.body.password.trim() !== "") {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } else {
                delete req.body.password;
            }

            await User.findByIdAndUpdate(req.params.id, req.body);
            req.session.success_msg = "Employee updated successfully!";
            return res.redirect('/admin/view-emp');
        } catch (error) {
            req.session.error_msg = "Failed to update employee details.";
            return res.redirect(req.get('Referer') || '/admin/view-emp');
        }
    },

    async dltEmp(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            req.session.success_msg = "Employee record deleted!";
            return res.redirect('/admin/view-emp');
        } catch (error) {
            req.session.error_msg = "Failed to delete employee.";
            return res.redirect('/admin/view-emp');
        }
    },

    // Department Handlers
    createDptPage(req, res) {
        return res.render('pages/admin/create-department');
    },

    async createDpt(req, res) {
        try {
            req.body.createdBy = req.userId;
            await Department.create(req.body);
            req.session.success_msg = "Department created successfully!";
            return res.redirect('/admin/view-dpt');
        } catch (error) {
            req.session.error_msg = "Failed to create department.";
            return res.redirect(req.get('Referer') || '/admin/create-dpt');
        }
    },

    async viewDptpage(req, res) {
        try {
            const department = await Department.find({});
            return res.render('pages/admin/view-department', { department });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async editDptpage(req, res) {
        try {
            const department = await Department.findById(req.params.id);
            return res.render("pages/admin/edit-department", { department });
        } catch (error) {
            return res.redirect('/admin/view-dpt');
        }
    },

    async editDpt(req, res) {
        try {
            await Department.findByIdAndUpdate(req.params.id, req.body);
            req.session.success_msg = "Department updated successfully!";
            return res.redirect('/admin/view-dpt');
        } catch (error) {
            req.session.error_msg = "Failed to update department.";
            return res.redirect(req.get('Referer') || '/admin/view-dpt');
        }
    },

    async dltDpt(req, res) {
        try {
            await Department.findByIdAndDelete(req.params.id);
            req.session.success_msg = "Department deleted!";
            return res.redirect('/admin/view-dpt');
        } catch (error) {
            req.session.error_msg = "Failed to delete department.";
            return res.redirect('/admin/view-dpt');
        }
    },

    // HR Handlers
    async createHRPage(req, res) {
        try {
            const dpt = await Department.find({});
            return res.render('pages/admin/create-hr', { dpt });
        } catch (error) {
            return res.render('pages/admin/create-hr', { dpt: [] });
        }
    },

    async createHR(req, res) {
        try {
            if (req.file) {
                req.body.image = req.file.path;
            }
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            req.body.role = "hr";

            await User.create(req.body);
            req.session.success_msg = "HR account created successfully!";
            return res.redirect('/admin/view-hr');
        } catch (error) {
            req.session.error_msg = "Failed to create HR account.";
            return res.redirect(req.get('Referer') || '/admin/create-hr');
        }
    },

    async viewHRPage(req, res) {
        try {
            const hrList = await User.find({ role: "hr" }).populate("department");
            return res.render('pages/admin/view-hr', { hrList });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async editHRPage(req, res) {
        try {
            const hr = await User.findById(req.params.id).populate("department");
            const dpt = await Department.find({});
            return res.render('pages/admin/edit-hr', { hr, dpt });
        } catch (error) {
            return res.redirect('/admin/view-hr');
        }
    },

    async editHR(req, res) {
        try {
            if (req.file) {
                req.body.image = req.file.path;
            }
            if (req.body.password && req.body.password.trim() !== "") {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } else {
                delete req.body.password;
            }

            await User.findByIdAndUpdate(req.params.id, req.body);
            req.session.success_msg = "HR account updated successfully!";
            return res.redirect('/admin/view-hr');
        } catch (error) {
            req.session.error_msg = "Failed to update HR account.";
            return res.redirect(req.get('Referer') || '/admin/view-hr');
        }
    },

    async dltHR(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            req.session.success_msg = "HR account deleted!";
            return res.redirect('/admin/view-hr');
        } catch (error) {
            req.session.error_msg = "Failed to delete HR account.";
            return res.redirect('/admin/view-hr');
        }
    }

};

export default adminController;