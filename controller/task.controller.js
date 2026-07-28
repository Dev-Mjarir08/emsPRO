import Task from "../models/task.model.js";
import User from "../models/user.model.js";

const taskController = {

    async viewTasksPage(req, res) {
        try {
            const tasks = await Task.find()
                .populate("assignedTo", "name email")
                .populate("assignedBy", "name email")
                .sort({ createdAt: -1 });

            return res.render('pages/task/view-tasks', { tasks });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async createTaskPage(req, res) {
        try {
            const employees = await User.find({ role: { $in: ["employee", "hr"] } });
            return res.render('pages/task/create-task', { employees });
        } catch (error) {
            return res.redirect('/task/view');
        }
    },

    async createTask(req, res) {
        try {
            const { title, description, assignedTo, deadline, priority, status, price } = req.body;
            await Task.create({
                title,
                description,
                assignedTo,
                assignedBy: req.userId,
                deadline,
                priority: priority || "Medium",
                status: status || "Pending",
                price: Number(price) || 0
            });

            req.session.success_msg = "Task / Project created successfully!";
            return res.redirect('/task/view');
        } catch (error) {
            req.session.error_msg = "Failed to create task.";
            return res.redirect(req.get('Referer') || '/task/create');
        }
    },

    async editTaskPage(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            const employees = await User.find({ role: { $in: ["employee", "hr"] } });
            return res.render('pages/task/edit-task', { task, employees });
        } catch (error) {
            return res.redirect('/task/view');
        }
    },

    async editTask(req, res) {
        try {
            const { title, description, assignedTo, deadline, priority, status, price } = req.body;
            await Task.findByIdAndUpdate(req.params.id, {
                title,
                description,
                assignedTo,
                deadline,
                priority,
                status,
                price: Number(price) || 0
            });

            req.session.success_msg = "Task details updated successfully!";
            return res.redirect('/task/view');
        } catch (error) {
            req.session.error_msg = "Failed to update task.";
            return res.redirect(req.get('Referer') || '/task/view');
        }
    },

    async dltTask(req, res) {
        try {
            await Task.findByIdAndDelete(req.params.id);
            req.session.success_msg = "Task deleted!";
            return res.redirect('/task/view');
        } catch (error) {
            req.session.error_msg = "Failed to delete task.";
            return res.redirect('/task/view');
        }
    },

    async myTasksPage(req, res) {
        try {
            const tasks = await Task.find({ assignedTo: req.userId })
                .populate("assignedBy", "name email")
                .sort({ createdAt: -1 });

            return res.render('pages/task/my-tasks', { tasks });
        } catch (error) {
            return res.redirect('/emp/dashboard');
        }
    },

    async updateTaskStatus(req, res) {
        try {
            const { status } = req.body;
            await Task.findByIdAndUpdate(req.params.id, { status });
            req.session.success_msg = `Task status updated to ${status}!`;
            return res.redirect(req.get('Referer') || '/task/my-tasks');
        } catch (error) {
            req.session.error_msg = "Failed to update task status.";
            return res.redirect(req.get('Referer') || '/task/my-tasks');
        }
    }

};

export default taskController;
