import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { config } from "./config";
import messagesRouter from "./routes/messages";
import authRouter from "./routes/auth";
import { swaggerUi, specs } from "./swagger";
import logger from "./utils/logger";

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

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

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

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
