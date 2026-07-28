import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import sendMail from "../middlewares/nodemailer.js";

const accountController = {

    async profilePage(req, res) {
        try {
            const user = await User.findById(req.userId).populate("department");
            return res.render('pages/account/profile', { profileUser: user });
        } catch (error) {
            return res.redirect('/admin/dashboard');
        }
    },

    async editProfilePage(req, res) {
        try {
            const user = await User.findById(req.userId).populate("department");
            return res.render('pages/account/edit-profile', { profileUser: user });
        } catch (error) {
            return res.redirect('/profile');
        }
    },

    async updateProfile(req, res) {
        try {
            const { name, phone, address } = req.body;
            const updateData = { name, phone, address };
            if (req.file) {
                updateData.image = req.file.path;
            }
            await User.findByIdAndUpdate(req.userId, updateData);
            req.session.success_msg = "Profile updated successfully!";
            return res.redirect('/profile');
        } catch (error) {
            req.session.error_msg = "Failed to update profile.";
            return res.redirect('/edit-profile');
        }
    },

    changePasswordPage(req, res) {
        return res.render('pages/account/change-password');
    },

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await User.findById(req.userId);

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                req.session.error_msg = "Current password is incorrect!";
                return res.redirect('/change-password');
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            req.session.success_msg = "Password changed successfully!";
            return res.redirect('/profile');
        } catch (error) {
            req.session.error_msg = "Error changing password.";
            return res.redirect('/change-password');
        }
    },

    logout(req, res) {
        res.clearCookie("token");
        req.session.success_msg = "Logged out successfully.";
        return res.redirect('/admin/login');
    },

    forgotPasswordPage(req, res) {
        return res.render('pages/auth/forgot-password');
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                req.session.error_msg = "Email address not found!";
                return res.render('pages/auth/forgot-password');
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            user.otp = otp;
            user.otpExpire = Date.now() + 5 * 60 * 1000;
            await user.save();

            await sendMail(email, otp);
            req.session.success_msg = "OTP verification code sent to your email!";
            return res.render('pages/auth/reset-password', { email });
        } catch (error) {
            req.session.error_msg = "Error sending OTP email.";
            return res.render('pages/auth/forgot-password');
        }
    },

    resetPasswordPage(req, res) {
        return res.render('pages/auth/reset-password', { email: req.query.email || "" });
    },

    async resetPassword(req, res) {
        try {
            const { email, otp, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || user.otp != otp || Date.now() > user.otpExpire) {
                req.session.error_msg = "Invalid or expired OTP code!";
                return res.render('pages/auth/reset-password', { email });
            }

            user.password = await bcrypt.hash(password, 10);
            user.otp = null;
            user.otpExpire = null;
            await user.save();

            req.session.success_msg = "Password reset successful! Please sign in with your new password.";
            return res.redirect('/admin/login');
        } catch (error) {
            req.session.error_msg = "Error resetting password.";
            return res.redirect('/admin/login');
        }
    }

};

export default accountController;
