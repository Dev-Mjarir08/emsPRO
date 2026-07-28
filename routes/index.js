import { Router } from "express";
import apiRouter from "./api/index.js";
import AdminRouter from "./admin.route.js";
import adminController from "../controller/admin.controller.js";
import empRouter from "./emp.route.js";
import hrRouter from "./hr.route.js";
import taskRouter from "./task.route.js";
import accountRouter from "./account.route.js";
import payrollRouter from "./payroll.route.js";

const router = Router();

router.get('/', adminController.homePage);
router.use('/api', apiRouter);
router.use('/admin', AdminRouter);
router.use('/emp', empRouter);
router.use('/hr', hrRouter);
router.use('/task', taskRouter);
router.use('/payroll', payrollRouter);
router.use('/', accountRouter);

export default router;