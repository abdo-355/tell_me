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
// app.use(cors({ origin: process.env.FRONT_END }));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   // fixing the cors problem
//   res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_END);

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   // Pass to next layer of middleware
//   next();
// });

app.get("/api", (req, res) => {
  res.send("The server is working");
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

export default app;
