import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { config } from "./config";
import messagesRouter from "./routes/messages";
import authRouter from "./routes/auth";
import { swaggerUi, specs } from "./swagger";

const app = express();

app.use(express.json());
//enables cors
app.use(
  cors({
    origin: config.frontEnd,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.disable("view cache");

app.get("/api", (req, res) => {
  res.send("The server is working");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/messages", messagesRouter);
app.use("/api/auth", authRouter);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .set("strictQuery", false)
  .connect(config.mongoUri)
  .catch((err) => console.log(err));

export default app;
