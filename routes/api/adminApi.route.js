import { Router } from "express";
import adminApiController from "../../controller/api/departmentApi.controller.js";
import departmentApi from "../../controller/api/departmentApi.controller.js";
import empApi from "../../controller/api/empApi.controller.js";
import hrApi from "../../controller/api/hrApi.controller.js";
import adminApi from "../../controller/api/adminApi.controller.js";

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
adminApiRouter.get('/',departmentApi.getAlldpt)//get all departments
adminApiRouter.post('/add-department',departmentApi.addDepartment)//add department
adminApiRouter.delete('/departments/:id',departmentApi.deleteDepartment)//delete department
adminApiRouter.patch('/department/:id',departmentApi.editDepartment)//edit department

//Authentication API
adminApiRouter.get('/login',adminApi.login)

export default adminApiRouter