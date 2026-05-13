import { Router } from "express";
import adminApiController from "../../controller/api/departmentApi.controller.js";
import departmentApi from "../../controller/api/departmentApi.controller.js";
import empApi from "../../controller/api/empApi.controller.js";
import hrApi from "../../controller/api/hrApi.controller.js";
import adminApi from "../../controller/api/adminApi.controller.js";
import authApi from "../../controller/api/authApi.controller.js";
import userAuth from "../../middlewares/userAuth.js";
import taskApi from "../../controller/api/taskApi.controller.js";

const adminApiRouter =Router()
//Admin API
adminApiRouter.post('/create-admin',adminApi.createAdmin)//Create Admin

//User API
adminApiRouter.post('/emp/add-Emp',empApi.addEmp)//add employee
adminApiRouter.delete('/emp/:id',empApi.deleteEmp)//delete Employee
adminApiRouter.get('/emps',empApi.getAllemp)//get all employee
adminApiRouter.patch('/emp/:id',empApi.editEmp)//edit employee

//HR API
adminApiRouter.post('/hr/add-hr',hrApi.addHR)//add hr
adminApiRouter.delete('/hr/:id',hrApi.deleteHR)//delete hr
adminApiRouter.get('/hrs',hrApi.getAllHR)//get all hr
adminApiRouter.patch('/hr/:id',hrApi.editHR)//edit hr

//Department API
adminApiRouter.get('/dpt/all',departmentApi.getAlldpt)//get all departments
adminApiRouter.post('/dpt/add-department',departmentApi.addDepartment)//add department
adminApiRouter.delete('/dpt/departments/:id',departmentApi.deleteDepartment)//delete department
adminApiRouter.patch('/dpt/:id',departmentApi.editDepartment)//edit department

//Authentication API
adminApiRouter.post('/auth/login',authApi.login)
adminApiRouter.post('/auth/logout',authApi.logout)
adminApiRouter.post("/auth/forgot-password", authApi.forgotPassword);
adminApiRouter.post("/auth/reset-password", authApi.resetPassword);
adminApiRouter.get("/auth/profile", userAuth, authApi.profile);

// Task API
adminApiRouter.post("/task/create", taskApi.createTask);

// Assign Task
adminApiRouter.post("/task/assign", taskApi.assignTask);

// Get All Tasks
adminApiRouter.get("/task/all", taskApi.getAllTasks);

// Get Single Task
adminApiRouter.get("/task/:id", taskApi.getSingleTask);

// Edit Task
adminApiRouter.put("/task/edit/:id", taskApi.editTask);

// Delete Task
adminApiRouter.delete("/task/delete/:id", taskApi.deleteTask);

// Update Status
adminApiRouter.put("/task/status/:id", taskApi.updateTaskStatus);

export default adminApiRouter