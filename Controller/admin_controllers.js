import { Admin_Connect, form_data_connect } from "../Mongodb/Schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const AdminAuthenticated = async (req, res, next) => {
    try {
        const Cookie_Value = req.cookies[process.env.AdminCookie];
        const id = jwt.verify(Cookie_Value, process.env.jwtsecrettoken, (err, res) => {
            if (err) {

            } else {
                return res.id;
            }
        });
        const Admin_Details = await Admin_Connect.findById(id).then().catch((e) => {
            console.log("Admin Error");
        });
        if (!Admin_Details) {
            res.send("Plaese login");
            return;
        }
        next();

    } catch (e) {
        res.send("Please Login");
    }
}
export const AdminLogin = async (req, res) => {
    const { Email, Password } = req.body;
    const isAdmin = await Admin_Connect.findOne({ Email: Email }).then().catch((e) => {
        res.send("Try Again");
        return;
    });
    // console.log(isAdmin);
    if (!isAdmin) {
        res.send({
            IsLogged: false,
            massage: "Email not Registered"
        });
        return;
    }
    const Comparepass = bcrypt.compareSync(Password, isAdmin.Password);
    if (!Comparepass) {
        res.send({
            IsLogged: false,
            massage: "Wrong Password"
        });
        return;
    }
    const jwtToken = jwt.sign({ id: isAdmin._id }, process.env.jwtsecrettoken);
    res.cookie(process.env.AdminCookie, jwtToken, { maxAge: 6000000, httpOnly: false });
    res.send({
        IsLogged: true,
        massage: "Admin Logged in"
    });
}
export const AdminLogout = async (req, res) => {
    const Admincookies = req.cookies[process.env.AdminCookie];
    if (Admincookies) {
        try {
            // const value = cookies.substr(cookies.indexOf("=") + 1, cookies.length);
            res.cookie(process.env.AdminCookie, Admincookies, { maxAge: 0, httpOnly: true });
            res.send("Cookie Deleted")
        } catch (e) {
            res.send("failed to logout");
        }
    } else {
        res.send("No cookie")
    }
}
export const AdminRegister = async (req, res) => {
    const { Email, Password,Name } = req.body;
    console.log(req.body);
    const isAdmin = await Admin_Connect.findOne({ Admin: true }).then().catch((e) => {
        res.send("Try Again");
        return;
    });
    if (isAdmin) {
        res.send("Admin Exist");
        return;
    }
    const HashedPassword = await bcrypt.hash(Password, 8)
    // console.log(HashedPassword)
    const Admin = await Admin_Connect.create({
        Email, Password: HashedPassword, Admin: true,Name
    });
    if (Admin) {
        res.send("Admin Created");
    }
}