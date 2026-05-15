import cookieParser from "cookie-parser"
const adminController = {
    homePage(req, res) {
        return res.render('index')
    },
    loginpage(req, res) {
        return res.render('pages/admin/login')
    },
    dashboard(req, res) {
        return res.render('pages/admin/dashboard')
    },
    async login(req, res) {

        try {

            const response = await fetch(
                'http://localhost:8081/api/admin/auth/login',
                {
                    method: 'POST',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );

            const data = await response.json();

            console.log(data);

            // Login Failed
            if (!data.success) {

                return res.redirect('/admin/login');
            }

            // Save Token
            res.cookie("token", data.token, {
                httpOnly: true,
            });

            // Admin Check
            if (data.user.role === "admin") {

                return res.redirect('/admin/dashboard');
            }
            else if (data.user.role === "hr") {
                return res.redirect('/hr/dashboard');
            }
            else {

                return res.redirect('/emp/dashboard');
            }

            // Non Admin

        } catch (error) {

            console.log(error.message);

            return res.redirect('/admin/login');
        }
    },
    createEmpPage(req, res) {
        return res.render('pages/admin/create-employee')
    },

  async createEmp(req, res) {
        try {
            const response = await fetch(
                'http://localhost:8081/api/admin/emp/add-Emp',
                {
                    method: 'POST',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );

            const data = await response.json()
            console.log(data);

            if (data.success) {

                return res.redirect('/admin/dashboard')

            } else {

                return res.redirect(req.get('Referer') || '/admin/create-emp')

            }

        } catch (error) {

            console.log(error.message);

            return res.redirect(req.get('Referer') || '/admin/creat-dpt');
        }
    },


    createDptPage(req, res) {
        return res.render('pages/admin/create-department')
    },
    async viewDptpage(req, res) {
        try {
            const response = await fetch(
                'http://localhost:8081/api/admin/dpt/all',
                {
                    method: 'GET',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );

            const data = await response.json()
            res.locals.department = data.dpt;
            console.log(data);
            return res.render('pages/admin/view-department')
        }
        catch (error) {

            console.log(error.message);

            res.redirect('/admin/dashboard');
        }
    },
    async createDpt(req, res) {
        try {
            const response = await fetch(
                'http://localhost:8081/api/admin/dpt/add-department',
                {
                    method: 'POST',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );

            const data = await response.json()
            console.log(data);

            if (data.success) {

                return res.redirect('/admin/dashboard')

            } else {

                return res.redirect(req.get('Referer') || '/admin/creat-dpt')

            }

        } catch (error) {

            console.log(error.message);

            return res.redirect(req.get('Referer') || '/admin/creat-dpt');
        }
    },
    async editDptpage(req, res) {
        try {
            const response = await fetch(
                `http://localhost:8081/api/admin/dpt/${req.params.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const data = await response.json();
            res.locals.department = data.dpt;
            return res.render("pages/admin/edit-department");

        } catch (error) {
            console.log(error);
            return res.send("Error loading edit page");
        }
    },
    async editDpt(req, res) {
        try {
            const response = await fetch(
                `http://localhost:8081/api/admin/dpt/${req.params.id}`,
                {
                    method: 'PATCH',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );
            const data = await response.json()
            return res.redirect('/admin/view-dpt')
            console.log(data);
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/admin/edit-dpt')
        }
    },

    async dltDpt(req, res) {
        try {
            const response = await fetch(
                `http://localhost:8081/api/admin/dpt/${req.params.id}`,
                {
                    method: 'DELETE',

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(req.body),
                }
            );
            const data = await response.json()
            return res.redirect('/admin/view-dpt')
            console.log(data);
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/admin/edit-dpt')
        }
    },

    createHRPage(req, res) {
        return res.render('pages/admin/create-hr')
    },


}
export default adminController