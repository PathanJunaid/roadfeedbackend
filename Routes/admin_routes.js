import express from 'express';
import { Admin_Connect, form_data_connect } from '../Mongodb/Schema.js';
import { AdminAuthenticated, AdminLogin, AdminLogout, AdminRegister, CheckAuth, DeleteAdmin, EditFormfeed } from '../Controller/admin_controllers.js';

export const admin_routes = express.Router();

admin_routes.post('/feedback/all',async(req,res)=>{
    var Response = {
        status: "success",
        code: 200,
        data: []
    }
    const data = await form_data_connect.find({}).then((res)=>{
        Response.data = [...res];
    }).catch((e)=>{
        Response = {
            status: "failed!",
            code: 404,
            data: []
        }
    })
    res.send(Response)
})
admin_routes.post('/admin/all',AdminAuthenticated,async(req,res)=>{
    var Response = {
        status: "success",
        code: 200,
        data: []
    }
    const data = await Admin_Connect.find({Email: { $ne: "zunaid931@gmail.com" }}).then((res)=>{
        Response.data = [...res];
    }).catch((e)=>{
        Response = {
            status: "failed!",
            code: 404,
            data: []
        }
    })
    res.send(Response)
})
admin_routes.post('/admin/login',AdminLogin);
admin_routes.post('/admin/logout',AdminLogout);
admin_routes.post('/admin/Register',AdminRegister);
admin_routes.post('/admin/checkauth',CheckAuth)
admin_routes.post('/admin/edit/:id',AdminAuthenticated,EditFormfeed)
admin_routes.post('/admin/Delete',AdminAuthenticated,DeleteAdmin)

