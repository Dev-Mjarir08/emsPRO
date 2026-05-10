import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'

const hrApi = {
    async addHR(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'hr'
            const hr = await User.create(req.body)
            return res.status(200).json({
                success: true,
                message: "HR added Successfully",
                hr
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async deleteHR(req, res) {
        try {
            const { id } = req.params;
            const dltHR = await User.findByIdAndDelete(id);
            console.log('delete HR');

            return res.status(200).json({
                success: true,
                message: "HR Deleted Successfully",
                dltHR
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async getAllHR(req, res) {
        try {
            const hr = await User.find({});
            return res.status(200).json({
                success: true,
                message: "All HR's",
                hr
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async editHR(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const editHR = await User.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({
                success: true,
                message: "HR edited Successfully",
                editHR
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
export default hrApi