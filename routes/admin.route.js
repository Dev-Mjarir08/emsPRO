import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/upload.js";

const AdminRouter = Router()

AdminRouter.get('/dashboard',userAuth,adminController.dashboard)
AdminRouter.get('/login',adminController.loginpage)
AdminRouter.post('/login',adminController.login)

//employee routes
AdminRouter.get('/create-emp',adminController.createEmpPage)
AdminRouter.post('/create-emp',upload,adminController.createEmp)
AdminRouter.get('/view-emp',adminController.viewEmpPage)
AdminRouter.get('/edit-emp/:id',adminController.editEmpPage)
// AdminRouter.post('/edit-dpt/:id',adminController.editEmp)
// AdminRouter.get('/dlt-dpt/:id',adminController.dltEmp)

//Department Routes
AdminRouter.get('/create-dpt',adminController.createDptPage)
AdminRouter.post('/create-dpt',adminController.createDpt)
AdminRouter.get('/view-dpt',adminController.viewDptpage)
AdminRouter.get('/edit-dpt/:id',adminController.editDptpage)
AdminRouter.post('/edit-dpt/:id',adminController.editDpt)
AdminRouter.get('/dlt-dpt/:id',adminController.dltDpt)

//HR Routes
AdminRouter.get('/create-hr',adminController.createHRPage)

export default AdminRouter