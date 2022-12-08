import express, { Express } from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { courseRouter } from './routes/course';
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'


dotenv.config();

mongoose.connect('mongodb+srv://root:PV2WBgZvdlr80YgY@cluster0.g3bhdno.mongodb.net/skilllane?retryWrites=true&w=majority',);

const app: Express = express();

app.use(cors({credentials: true, origin: ['http://localhost:3000', 'https://skl-fe-teerawit37.vercel.app/']})) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(json({ limit: '50mb' }))
app.use(cookieParser());

app.use("/api/courses", courseRouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const port = process.env.BACK_PORT;


app.get('/', (req, res) => {
  res.send("What's up doc ?!");
});

// start the server
app.listen(port, () => {
  console.log(`server running`);
});

