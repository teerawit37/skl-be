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

mongoose.connect(process.env.DB_URL);

const app: Express = express();

const whitelist = [
  "http://localhost:3000",
  "https://skl-fe-teerawit37.vercel.app",
  "https://skl-fe.vercel.app",
  "https://skl-fe.herokuapp.com"
]

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
      if(!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error("Not allowed by CORS: "+ origin))
      }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(json({ limit: '50mb' }))
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use("/api/courses", courseRouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const port = process.env.BACK_PORT;


app.get('/', (req, res) => {
  res.send("Hi Skilllane!");
});

// start the server
app.listen(port, () => {
  console.log(`server running`);
});

