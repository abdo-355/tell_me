import express from "express";
import cors from "cors";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

import authRouter from "./routes/auth";
import messagesRouter from "./routes/messages";
import messagesSocket from "./sockets/messages";

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

export interface ICustomSocket extends Socket {
  userId?: string;
}

// socket authentication
io.use((socket: ICustomSocket, next) => {
  const tokenHeader = socket.handshake.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  // Verify the token and extract the user ID
  if (token) {
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, { userId }: { userId: string }) => {
        if (err) return next(new Error("Invalid token"));

        // Attach the user ID to the socket object
        socket.userId = userId;
        next();
      }
    );
  } else {
    next();
  }
});

io.on("connection", (socket) => {
  messagesSocket(socket);
});

export default app;
