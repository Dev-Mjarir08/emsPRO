import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";

const AdminRouter = Router()

AdminRouter.get('/dashboard',userAuth,adminController.dashboard)
AdminRouter.get('/login',adminController.loginpage)
AdminRouter.post('/login',adminController.login)

export default AdminRouter