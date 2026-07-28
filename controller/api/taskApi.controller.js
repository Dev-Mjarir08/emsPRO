import Task from "../../models/task.model.js";

const taskApi = {

  // Create Task
  async createTask(req, res) {
    try {
      const { title, description, assignedTo, assignedBy, deadline, priority, status } = req.body;

      const task = await Task.create({
        title,
        description,
        assignedTo: assignedTo || req.user?._id,
        assignedBy: assignedBy || req.user?._id,
        deadline: deadline || new Date(),
        priority: priority || "Medium",
        status: status || "Pending"
      });

      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Server Error",
      });
    }
  },

  // Assign Task
  async assignTask(req, res) {
    try {

      const { taskId, userId } = req.body;

      const task = await Task.findByIdAndUpdate(
        taskId,
        {
          assignedTo: userId,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Task assigned successfully",
        task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Get All Tasks
  async getAllTasks(req, res) {
    try {

      const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("assignedBy", "name email")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        total: tasks.length,
        tasks,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Get My Tasks
  async getMyTasks(req, res) {
    try {
      const userId = req.user?._id || req.params.userId;
      const tasks = await Task.find({ assignedTo: userId })
        .populate("assignedBy", "name email")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        total: tasks.length,
        tasks,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Get Single Task
  async getSingleTask(req, res) {
    try {

      const { id } = req.params;

      const task = await Task.findById(id)
        .populate("assignedTo", "name email")
        .populate("assignedBy", "name email");

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.status(200).json({
        success: true,
        task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Edit Task
  async editTask(req, res) {
    try {

      const { id } = req.params;
      const { title, description, assignedTo, deadline, priority, status } = req.body;

      const updateData = { title, description };
      if (assignedTo) updateData.assignedTo = assignedTo;
      if (deadline) updateData.deadline = deadline;
      if (priority) updateData.priority = priority;
      if (status) updateData.status = status;

      const task = await Task.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Delete Task
  async deleteTask(req, res) {
    try {

      const { id } = req.params;

      const task = await Task.findByIdAndDelete(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  // Update Task Status
  async updateTaskStatus(req, res) {
    try {

      const { id } = req.params;

      const { status } = req.body;

      const task = await Task.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task status updated",
        task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

};

export default taskApi