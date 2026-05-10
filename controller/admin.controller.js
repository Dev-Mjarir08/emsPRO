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
    }
}
export default adminController