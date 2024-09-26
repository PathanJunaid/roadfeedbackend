import express  from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { Connections } from "./Mongodb/Connections.js";
import cors from 'cors';
import {User_routes} from "./Routes/user_routes.js";
import { admin_routes } from "./Routes/Admin_Routes.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  methods:["POST","GET"],
  credentials: true,
};
// MiddleWare 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(User_routes);
app.use(admin_routes);
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer errors
        res.status(400).send('Multer error: ' + err.message);
  } else {
      // Pass other errors to the default error handler
      next(err);
    }
});
// MiddleWare Ends
Connections();

const port = process.env.port;
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(4000,()=> {
    console.log(`Server running on 4000`);
})