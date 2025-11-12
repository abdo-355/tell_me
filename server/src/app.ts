import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";
import { swaggerUi, specs } from "./swagger";

const app = express();
config();

app.use(express.json());
//enables cors
app.use(
  cors({
    origin: process.env.FRONT_END || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: (process.env.FRONT_END || "").startsWith("https"),
      sameSite: (process.env.FRONT_END || "").startsWith("https") ? "none" : "lax",
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || "mongodb://mongo:27017/tellme" }),
  })
);
app.disable("view cache");
app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (req, res) => {
  res.send("The server is working");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI || "mongodb://mongo:27017/tellme")
  .catch((err) => console.log(err));

export default app;
