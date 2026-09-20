import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js'
import mongoose from 'mongoose';


import GithubUser from './models/githubUser.js';



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
app.use(cookieParser());

//routes
app.use('/auth', authRoutes);

app.get("/", (req, res)=>{
    res.send("api working")
})


app.get("/api/auth/me", async (req, res) => {

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // const user = await GithubUser.findById(
        //     decoded.id
        // ).select("-password");
        const user = await GithubUser.findById(
            decoded.id
        );

        res.json({
            user
        });

    } catch {
        res.status(401).json({
            message: "Invalid token"
        });
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at: http://localhost:${process.env.PORT}`);
})