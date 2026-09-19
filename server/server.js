import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.js'
import mongoose from 'mongoose';


configDotenv();
const app = express();

//mongodb connection
mongoose.connect(process.env.MONGOURI || "mongodb://localhost:27017/chatapp")
.then(()=> console.log("connected to mongodb"))
.catch(err => console.log("failed to connect mongodb", err));
//end


//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

//routes
app.use('/auth', authRoutes);

app.get("/", (req, res)=>{
    res.send("api working")
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at: http://localhost:${process.env.PORT}`);
})