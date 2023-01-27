import express from "express";
import cors from "cors";
import { config } from "dotenv";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";

const app = express();
config();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/messages", messagesRouter);

export default app;
