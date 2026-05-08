import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
const empApi = {
    async addEmp(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'employee'
            const user = await User.create(req.body)
            return res.json(user);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async deleteEmp(req, res) {
        try {
            const { id } = req.params;
            const dltEmp = await User.findByIdAndDelete(id);
            console.log('delete employee');

            return res.json(dltEmp);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async getAllemp(req, res) {
        try {
            const emps = await User.find({});
            return res.json(emps);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async editEmp(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const editEmp = await User.findByIdAndUpdate(req.params.id, req.body)
            return res.json(editEmp);
        } catch (error) {
            return res.json({ error: error.message });
        }
    }

}
export default empApi