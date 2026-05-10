import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'

const adminApi = {
    async createAdmin(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'admin'
            const admin = await User.create(req.body)
            return res.status(200).json({
                success: true,
                message: "Admin Created Successfully",
                admin
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async login(req, res) {

    }
}
export default adminApi