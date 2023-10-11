import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";

const app = express();
config();

app.use(express.json());
//enables cors
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (req, res) => {
  res.send("The server is working");
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

export default app;
