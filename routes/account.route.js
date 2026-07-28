import { Router } from "express";
import accountController from "../controller/account.controller.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/upload.js";

const accountRouter = Router();

accountRouter.get('/profile', userAuth, accountController.profilePage);
accountRouter.get('/edit-profile', userAuth, accountController.editProfilePage);
accountRouter.post('/edit-profile', userAuth, upload, accountController.updateProfile);
accountRouter.get('/change-password', userAuth, accountController.changePasswordPage);
accountRouter.post('/change-password', userAuth, accountController.changePassword);
accountRouter.get('/logout', accountController.logout);

accountRouter.get('/forgot-password', accountController.forgotPasswordPage);
accountRouter.post('/forgot-password', accountController.forgotPassword);
accountRouter.get('/reset-password', accountController.resetPasswordPage);
accountRouter.post('/reset-password', accountController.resetPassword);

export default accountRouter;
