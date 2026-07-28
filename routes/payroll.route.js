import { Router } from "express";
import payrollController from "../controller/payroll.controller.js";
import userAuth from "../middlewares/userAuth.js";

const payrollRouter = Router();

payrollRouter.get('/view', userAuth, payrollController.viewPayrolls);
payrollRouter.get('/create', userAuth, payrollController.createPayrollPage);
payrollRouter.post('/create', userAuth, payrollController.createPayroll);
payrollRouter.get('/pay/:id', userAuth, payrollController.markPaid);
payrollRouter.get('/dlt/:id', userAuth, payrollController.dltPayroll);

payrollRouter.get('/my-payslips', userAuth, payrollController.myPayslips);
payrollRouter.get('/payslip/:id', userAuth, payrollController.viewPayslip);

export default payrollRouter;
