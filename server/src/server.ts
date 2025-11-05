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
  socket.on("join", (path: string) => {
    // Basic auth check: ensure path is valid (exists in DB)
    // For full auth, would need to verify user session from cookie
    socket.join(path);
  });

  socket.on("disconnect", () => {
    // User disconnected
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
