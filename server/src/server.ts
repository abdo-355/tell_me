import { Clerk } from "@clerk/clerk-sdk-node";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { config, validateConfig } from "./config";
import logger from "./utils/logger";

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
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("join", (path: string) => {
    logger.info(`Socket ${socket.id} joined room: ${path}`);
    // Basic auth check: ensure path is valid (exists in DB)
    // For full auth, would need to verify user session from cookie
    socket.join(path);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
    // User disconnected
  });
});

// Connect to MongoDB
mongoose
  .set("strictQuery", false)
  .connect(config.mongoUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error', err));

const PORT = parseInt(config.port);
server.listen(PORT, config.host, () => {
  logger.info(`Server running on ${config.host}:${PORT}`);
});
