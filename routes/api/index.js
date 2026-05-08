import { Router } from "express";
import userApiRouter from "./userApi.route.js";
import adminApiRouter from "./adminApi.route.js";

const apiRouter =Router()

apiRouter.use('/user',userApiRouter)
apiRouter.use('/admin',adminApiRouter)

export default apiRouter