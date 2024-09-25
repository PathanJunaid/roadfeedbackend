import mongoose from "mongoose";

export const Connections = ()=>{
    mongoose.connect(`${process.env.Database_URL}`,{
        dbName:"Roadfeed",
    }).then((res)=>{
        console.log("Db Connected");
    }).catch((e)=>{
        console.log("Db connection failed!");
    })

}