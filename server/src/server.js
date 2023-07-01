import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { userRouter } from "./routes/user.js";
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
