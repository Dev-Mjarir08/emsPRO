import { Router } from "express";
import userAuth from "../middlewares/userAuth.js";
import empController from "../controller/emp.controller.js";

const empRouter = Router()

empRouter.get('/dashboard',userAuth,empController.dashboard)

export default empRouter