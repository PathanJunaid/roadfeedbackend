import express from 'express';
import { form_data_connect } from '../Mongodb/Schema.js';
import { AdminLogin, AdminLogout, AdminRegister } from '../Controller/admin_controllers.js';

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
admin_routes.post('/admin/login',AdminLogin);
admin_routes.post('/admin/logout',AdminLogout);
admin_routes.post('/admin/Register',AdminRegister);

