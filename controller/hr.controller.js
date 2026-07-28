import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const hrController = {
    async dashboard(req, res) {
        try {
            const totalEmployees = await User.countDocuments({ role: "employee" });
            const totalTasks = await Task.countDocuments({});

            return res.render('pages/manager/hrDashboard', {
                totalEmployees,
                totalTasks
            });
        } catch (error) {
            return res.render('pages/manager/hrDashboard', {
                totalEmployees: 0,
                totalTasks: 0
            });
        }
    }
};

export default hrController;