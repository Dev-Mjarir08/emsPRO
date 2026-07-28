import { Router } from "express";
import authApi from "../../controller/api/authApi.controller.js";
import taskApi from "../../controller/api/taskApi.controller.js";
import userAuth from "../../middlewares/userAuth.js";
import upload from "../../middlewares/upload.js";

const userApiRouter = Router();

userApiRouter.get('/profile', userAuth, authApi.profile);
userApiRouter.post('/update-profile', userAuth, upload, authApi.updateProfile);
userApiRouter.post('/change-password', userAuth, authApi.changePassword);

userApiRouter.get('/my-tasks', userAuth, taskApi.getMyTasks);
userApiRouter.put('/task/status/:id', userAuth, taskApi.updateTaskStatus);

export default userApiRouter;