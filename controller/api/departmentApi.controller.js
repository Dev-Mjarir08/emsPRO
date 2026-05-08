import Department from "../../models/department.model.js"

const departmentApi = {
    async addDepartment(req, res) {
        try {
            let dpt = await Department.create(req.body)
            console.log(department);

            return res.json(department);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            const dltDpt = await Department.findByIdAndDelete(id);
            return res.json(dltDpt);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async getAlldpt(req, res) {
        try {
             const dpt = await Department.find({});
                return res.json(dpt);
        } catch (error) {
            return res.json({ error: error.message });
        }
    },
    async editDepartment(req,res){
        try {
            const editDpt = await Department.findByIdAndUpdate(req.params.id,req.body)
               return res.json(editDpt);
        } catch (error) {
            return res.json({ error: error.message });
        }
    }
}
export default departmentApi