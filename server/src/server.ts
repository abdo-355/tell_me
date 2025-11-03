import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (path: string) => {
    console.log("joined room", path);
    socket.join(path);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
