import Department from "../../models/department.model.js"

const departmentApi = {
    async addDepartment(req, res) {
        try {
            let dpt = await Department.create(req.body)
            console.log(dpt);
            return res.status(200).json({
                success: true,
                message: "Department added Successfully",
                dpt
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            const dltDpt = await Department.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Department deleted Successfully",
                dltDpt
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async getAlldpt(req, res) {
        try {
            const dpt = await Department.find({});
            return res.status(200).json({
                success: true,
                message: "All Department",
                dpt
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async editDepartment(req, res) {
        try {
            const editDpt = await Department.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({
                success: true,
                message: "Department edited Successfully",
                editDpt
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    async singleDepartment(req, res) {

        try {

            const department = await Department.findById(req.params.id);

            return res.json({
                success: true,
                dpt: department
            });

        } catch (error) {

            return res.json({
                success: false,
                message: error.message
            });
        }
    }
}
export default departmentApi