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

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("connected on port 8080");
    });
  })
  .catch((err) => console.log(err));
