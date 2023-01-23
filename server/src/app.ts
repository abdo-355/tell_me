import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/auth";

const app = express();
config();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

export default app;
