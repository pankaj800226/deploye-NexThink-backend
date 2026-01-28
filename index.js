import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimite from "express-rate-limit";
dotenv.config();
import userRouter from "./routers/user/user.routers.js";
import todoRouter from "./routers/todo/todo.routers.js";
import coverImgRouter from './routers/dashboard/coverImg.router.js'
import shedularRouter from './routers/work_shedular/shedular.router.js';
import projectRouter from './routers/project_management/project.routers.js'
import featureRouter from './routers/project_management/feature.routers.js'

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimite({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too Many request, try later",
});

app.use(limiter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDb running");
  } catch (error) {
    console.log(error);
    console.log("Database not work");
  }
};

connectDb();

// api
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use('/api/coverImg', coverImgRouter)
app.use('/api/shedular', shedularRouter)
app.use('/api/project', projectRouter)
app.use('/api/feature', featureRouter)


app.listen(PORT, () => console.log("Server Is Running On Port", PORT));
