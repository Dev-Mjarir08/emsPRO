import { Router } from "express";
import userAuth from "../middlewares/userAuth.js";
import hrController from "../controller/hr.controller.js";


const hrRouter = Router()

hrRouter.get('/dashboard',userAuth,hrController.dashboard)

export default hrRouter