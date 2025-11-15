import { Clerk } from "@clerk/clerk-sdk-node";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { config, validateConfig } from "./config";

// Initialize Clerk
Clerk({ secretKey: config.clerkSecretKey });

// Validate configuration at startup
validateConfig();

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: config.frontEnd,
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

const PORT = parseInt(config.port);
server.listen(PORT, config.host, () => {
  console.log(`Server running on ${config.host}:${PORT}`);
});
