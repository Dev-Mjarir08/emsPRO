import User from "../../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendMail from "../../middlewares/nodemailer.js"
const authApi = {
    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User Not Found"
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Password"
                })
            }
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                'secret',
                { expiresIn: "7d" }
            )

            return res.status(200).json({
                success: true,
                message: "Login Successfully",
                token,
                user
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    logout(req, res) {

        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logout Successfully"
        });
    },
    async forgotPassword(req, res) {

        try {

            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "Email not found"
                });

            }

            const otp = Math.floor(100000 + Math.random() * 900000);

            user.otp = otp;

            user.otpExpire = Date.now() + 5 * 60 * 1000;

            await user.save();

            await sendMail(email, otp);

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    },
    async resetPassword(req, res) {

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            // Hash Password
            const hashPassword = await bcrypt.hash(password, 10);

            // Update Password
            user.password = hashPassword;

            // Clear OTP
            user.otp = null;
            user.otpExpire = null;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Password reset successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    },
    async profile(req, res) {

        try {

            const user = await User.findById(req.user.id)
                .populate("department")
                .select("-password");

            return res.status(200).json({
                success: true,
                user
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default authApi;