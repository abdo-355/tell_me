import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";

const app = express();
config();

app.use(express.json());
//enables cors
app.use(
  cors({
    origin: process.env.FRONT_END,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { sameSite: "none", secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (req, res) => {
  res.send("The server is working");
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI)
  .catch((err) => console.log(err));

export default app;
