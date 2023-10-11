import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "cookie-session";
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";

const app = express();
config();

app.use(express.json());
//enables cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
  })
);
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
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
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("connected on port 8080");
    });
  })
  .catch((err) => console.log(err));
