import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/upload.js";

const AdminRouter = Router();

// Auth routes
AdminRouter.get('/login', adminController.loginpage);
AdminRouter.post('/login', adminController.login);
AdminRouter.get('/dashboard', userAuth, adminController.dashboard);

// Employee routes
AdminRouter.get('/create-emp', userAuth, adminController.createEmpPage);
AdminRouter.post('/create-emp', userAuth, upload, adminController.createEmp);
AdminRouter.get('/view-emp', userAuth, adminController.viewEmpPage);
AdminRouter.get('/edit-emp/:id', userAuth, adminController.editEmpPage);
AdminRouter.post('/edit-emp/:id', userAuth, upload, adminController.editEmp);
AdminRouter.get('/dlt-emp/:id', userAuth, adminController.dltEmp);

// Department routes
AdminRouter.get('/create-dpt', userAuth, adminController.createDptPage);
AdminRouter.post('/create-dpt', userAuth, adminController.createDpt);
AdminRouter.get('/view-dpt', userAuth, adminController.viewDptpage);
AdminRouter.get('/edit-dpt/:id', userAuth, adminController.editDptpage);
AdminRouter.post('/edit-dpt/:id', userAuth, adminController.editDpt);
AdminRouter.get('/dlt-dpt/:id', userAuth, adminController.dltDpt);

// HR routes
AdminRouter.get('/create-hr', userAuth, adminController.createHRPage);
AdminRouter.post('/create-hr', userAuth, upload, adminController.createHR);
AdminRouter.get('/view-hr', userAuth, adminController.viewHRPage);
AdminRouter.get('/edit-hr/:id', userAuth, adminController.editHRPage);
AdminRouter.post('/edit-hr/:id', userAuth, upload, adminController.editHR);
AdminRouter.get('/dlt-hr/:id', userAuth, adminController.dltHR);

export default AdminRouter;