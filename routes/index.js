import { Router } from "express";
import apiRouter from "./api/index.js";
import AdminRouter from "./admin.route.js";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";
import empRouter from "./emp.route.js";
import hrRouter from "./hr.route.js";

const router =Router()
router.get('/',adminController.homePage)
router.use('/api',apiRouter)
router.use('/admin',AdminRouter)
router.use('/emp',empRouter)
router.use('/hr',hrRouter)

export default router;