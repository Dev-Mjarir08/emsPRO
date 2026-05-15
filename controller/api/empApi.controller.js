import bcrypt from 'bcrypt'
import User from '../../models/user.model.js'
const empApi = {
    async addEmp(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'employee'
            const employee = (await User.create(req.body))
            return res.status(200).json({
                success: true,
                message: "Employee added Successfully",
                employee
            })
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async deleteEmp(req, res) {
        try {
            const { id } = req.params;
            const dltEmp = await User.findByIdAndDelete(id);
            console.log('delete employee');

             return res.status(200).json({
                success: true,
                message: "Employee Deleted Successfully",
                dltEmp
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async getAllemp(req, res) {
        try {
            const emps = await User.find({});
            return res.status(200).json({
                success: true,
                message: "All Employee's",
                emps
            })
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async editEmp(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const editEmp = await User.findByIdAndUpdate(req.params.id, req.body)
             return res.status(200).json({
                success: true,
                message: "Employee edited Successfully",
                editDpt
            })
        }
         catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
export default empApi