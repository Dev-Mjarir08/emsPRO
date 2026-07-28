import { Router } from "express";
import taskController from "../controller/task.controller.js";
import userAuth from "../middlewares/userAuth.js";

const taskRouter = Router();

taskRouter.get('/view', userAuth, taskController.viewTasksPage);
taskRouter.get('/create', userAuth, taskController.createTaskPage);
taskRouter.post('/create', userAuth, taskController.createTask);
taskRouter.get('/edit/:id', userAuth, taskController.editTaskPage);
taskRouter.post('/edit/:id', userAuth, taskController.editTask);
taskRouter.get('/dlt/:id', userAuth, taskController.dltTask);

taskRouter.get('/my-tasks', userAuth, taskController.myTasksPage);
taskRouter.post('/update-status/:id', userAuth, taskController.updateTaskStatus);

export default taskRouter;
