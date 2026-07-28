import Payroll from "../models/payroll.model.js";
import User from "../models/user.model.js";

const payrollController = {

    async viewPayrolls(req, res) {
        try {
            const payrolls = await Payroll.find()
                .populate({ path: "employee", populate: { path: "department" } })
                .sort({ createdAt: -1 });

            return res.render('pages/payroll/view-payrolls', { payrolls });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async createPayrollPage(req, res) {
        try {
            const employees = await User.find({ role: { $in: ["employee", "hr"] } }).populate("department");
            return res.render('pages/payroll/create-payroll', { employees });
        } catch (error) {
            return res.redirect('/payroll/view');
        }
    },

    async createPayroll(req, res) {
        try {
            const { employee, month, basicSalary, allowance, deduction, status } = req.body;
            const basic = Number(basicSalary) || 0;
            const allow = Number(allowance) || 0;
            const deduct = Number(deduction) || 0;
            const netSalary = basic + allow - deduct;

            await Payroll.create({
                employee,
                month,
                basicSalary: basic,
                allowance: allow,
                deduction: deduct,
                netSalary,
                status: status || "Pending",
                paymentDate: status === "Paid" ? new Date() : null
            });

            req.session.success_msg = "Payslip generated successfully!";
            return res.redirect('/payroll/view');
        } catch (error) {
            req.session.error_msg = "Failed to generate payslip.";
            return res.redirect(req.get('Referer') || '/payroll/create');
        }
    },

    async markPaid(req, res) {
        try {
            await Payroll.findByIdAndUpdate(req.params.id, {
                status: "Paid",
                paymentDate: new Date()
            });

            req.session.success_msg = "Salary marked as Paid!";
            return res.redirect('/payroll/view');
        } catch (error) {
            req.session.error_msg = "Failed to update payment status.";
            return res.redirect('/payroll/view');
        }
    },

    async dltPayroll(req, res) {
        try {
            await Payroll.findByIdAndDelete(req.params.id);
            req.session.success_msg = "Payroll entry deleted!";
            return res.redirect('/payroll/view');
        } catch (error) {
            req.session.error_msg = "Failed to delete payroll record.";
            return res.redirect('/payroll/view');
        }
    },

    async myPayslips(req, res) {
        try {
            const payslips = await Payroll.find({ employee: req.userId })
                .populate({ path: "employee", populate: { path: "department" } })
                .sort({ createdAt: -1 });

            return res.render('pages/payroll/my-payslips', { payslips });
        } catch (error) {
            return res.redirect('/emp/dashboard');
        }
    },

    async viewPayslip(req, res) {
        try {
            const payslip = await Payroll.findById(req.params.id)
                .populate({ path: "employee", populate: { path: "department" } });

            if (!payslip) {
                req.session.error_msg = "Payslip not found.";
                return res.redirect('/payroll/my-payslips');
            }

            return res.render('pages/payroll/payslip-detail', { payslip });
        } catch (error) {
            return res.redirect('/payroll/my-payslips');
        }
    }

};

export default payrollController;
