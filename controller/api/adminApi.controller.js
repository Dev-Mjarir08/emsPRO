import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'

const adminApi = {
    async createAdmin(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'admin'
            const admin = await User.create(req.body)
            return res.json(admin);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async login(req,res){
        
    }
}
export default adminApi