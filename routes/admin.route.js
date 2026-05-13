import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";

const AdminRouter = Router()

AdminRouter.get('/dashboard',userAuth,adminController.dashboard)
AdminRouter.get('/login',adminController.loginpage)
AdminRouter.post('/login',adminController.login)

//employee routes
AdminRouter.get('/create-emp',adminController.createEmpPage)
AdminRouter.get('/create-dpt',adminController.createDptPage)
AdminRouter.post('/create-dpt',adminController.createDpt)
AdminRouter.get('/view-dpt',adminController.viewDptpage)
AdminRouter.get('/edit-dpt/:id',adminController.editDptpage)

AdminRouter.get('/create-hr',adminController.createHRPage)

export default AdminRouter