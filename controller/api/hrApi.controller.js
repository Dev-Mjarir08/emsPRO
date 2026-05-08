import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'

const hrApi ={
 async addHR(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'hr'
            const user = await User.create(req.body)
            return res.json(user);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async deleteHR(req, res) {
        try {
            const { id } = req.params;
            const dltHR = await User.findByIdAndDelete(id);
            console.log('delete HR');

            return res.json(dltHR);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async getAllHR(req, res) {
        try {
            const hr = await User.find({});
            return res.json(hr);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async editHR(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const editHR = await User.findByIdAndUpdate(req.params.id, req.body)
            return res.json(editHR);
        } catch (error) {
            return res.json({ error: error.message });
        }
    }
}
export default hrApi