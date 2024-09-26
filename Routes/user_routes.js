import express from 'express';
import { form_data_connect } from '../Mongodb/Schema.js';
import { upload } from '../Middleware/Multer.js';
import { feedbackformsearch } from '../Controller/User_Controllers.js';

export const User_routes = express.Router();

User_routes.post('/formsubmit', upload.single('Image'), async (req, res) => {
    const { Name, Email, Number, City, State, Latitude, Longitude, Description,Category,Severity } = req.body;
    console.log(req.body)
    const Image = req.file.filename;
    const data = await form_data_connect.create({
        Name, Email, Number, City, State, Latitude, Longitude, Image, Description,Category,Severity,Status:"Pending"
    })
    if (data) {
        res.send({
            status: "Success",
            code: "200",
            data: []
        })
    } else {
        res.send({
            status: "Error",
            code: "400",
            data: []
        })
    }
})
User_routes.post('/formfeed/:id', async (req, res) => {
    var Response = {
        status: "success",
        code: 200,
        data: []
    }
    const { id } = req.params;
    const data = await form_data_connect.findById(id).then((res) => {
        Response.data = [res];
        return res
    }).catch((e) => {
        Response = {
            status: "failed",
            code: 404,
            data: []
        }
        return "Failed";
    })
    res.send(Response);
})
User_routes.post('/feedback/search',feedbackformsearch);