import Task from "../models/task.model.js";

const empController = {
    async dashboard(req, res) {
        try {
            const assignedTasks = await Task.countDocuments({ assignedTo: req.userId });
            const pendingTasks = await Task.countDocuments({ assignedTo: req.userId, status: "Pending" });
            const completedTasks = await Task.countDocuments({ assignedTo: req.userId, status: "Completed" });

            return res.render('pages/employee/employeeDash', {
                assignedTasks,
                pendingTasks,
                completedTasks
            });
        } catch (error) {
            return res.render('pages/employee/employeeDash', {
                assignedTasks: 0,
                pendingTasks: 0,
                completedTasks: 0
            });
        }
    }
};

export default empController;