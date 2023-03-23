import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import { createServer } from "http";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";
import { Server } from "socket.io";

const app = express();
config();

export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: [process.env.FRONT_END],
  },
});

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/messages", messagesRouter);

io.on("connection", (socket) => {
  console.log(socket.id);
});

export default app;
