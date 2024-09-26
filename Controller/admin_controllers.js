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
            status: "Email not Registered",
            code: "220",
            data: []

        });
        return;
    }
    const Comparepass = bcrypt.compareSync(Password, isAdmin.Password);
    if (!Comparepass) {
        res.send({
            status: "Wrong Password",
            code: "220",
            data: []
        });
        return;
    }
    const jwtToken = jwt.sign({ id: isAdmin._id }, process.env.jwtsecrettoken);
    res.cookie(process.env.AdminCookie, jwtToken, { maxAge: 6000000, httpOnly: false });
    res.send({
        status: "Logged in Successfully!",
        code: "200",
        data: []
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
    const { Email, Password, Name } = req.body;
    const isAdmin = await Admin_Connect.findOne({ Email: Email }).then().catch((e) => {

        return;
    });
    if (isAdmin) {
        res.send({
            status: "Email Already in Use",
            code: "220",
            data: []
        });
        return;
    }
    const HashedPassword = await bcrypt.hash(Password, 8)
    // console.log(HashedPassword)
    const Admin = await Admin_Connect.create({
        Email, Password: HashedPassword, Admin: true, Name
    });
    if (Admin) {
        res.send({
            status: "User Created",
            code: "210",
            data: [Admin]
        });
    }
}
export const CheckAuth = async (req, res) => {
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
        console.log(id)
        if (!Admin_Details) {
            res.send({
                status: "Not Logged In",
                code: "220",
                data: []
            });
            return;
        } else {
        }
        res.send({
            status: "Logged In",
            code: "200",
            data: []
        });
        // next();

    } catch (e) {
        res.send({
            status: "Not",
            code: "220",
            data: []
        })
    }

}
export const EditFormfeed = async (req, res) => {
    try {
        const { id } = req.params;
        const { msg } = req.body;
        console.log(msg)
        const resp = await form_data_connect.findByIdAndUpdate(id, { $set: { Status: msg } });
        console.log(resp)
        if (resp) {
            res.send(
                {
                    status: "Status Updated!",
                    code: "200",
                    data: []
                }
            )
        } else {
            res.send(
                {
                    status: "Failed!",
                    code: "220",
                    data: []
                }
            )

        }

    } catch (e) {
        res.send(
            {
                status: "Failed!",
                code: "220",
                data: []
            }
        )
    }

}
export const DeleteAdmin = async (req, res) => {
    const {id} = req.body
    var Response = {
        status: "Deleted User",
        code: 200,
        data: []
    }
    const data = await Admin_Connect.findByIdAndDelete(id).then((res) => {
        
    }).catch((e) => {
        Response = {
            status: "failed!",
            code: 404,
            data: []
        }
    })
    res.send(Response)
}
