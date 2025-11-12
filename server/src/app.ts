import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import { config } from "./config";
import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";
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
app.use(
  session({
    secret: config.expressSessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: config.frontEnd.startsWith("https"),
      sameSite: config.frontEnd.startsWith("https") ? "none" : "lax",
    },
    store: MongoStore.create({ mongoUrl: config.mongoUri }),
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
  .connect(config.mongoUri)
  .catch((err) => console.log(err));

export default app;
