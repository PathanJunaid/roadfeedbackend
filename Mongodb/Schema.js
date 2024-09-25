import mongoose from "mongoose";

const Form_Schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    }, Number: {
        type: Number,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Latitude: {
        type: Number,
        required: true,
    },
    Longitude: {
        type: Number,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    }
})

export const form_data_connect = mongoose.model("Formdata",Form_Schema);

const Admin_Schema = new mongoose.Schema({
    Email : {
        type : String,
        required:true,
    },
    Password : {
        type : String,
        required:true,
    },
    Admin : {
        type : String,
        required : true,
    },
    Name : {
        type:String,
        required : true,
    },
})

export const Admin_Connect = mongoose.model('User_Details',Admin_Schema);