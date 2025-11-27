import { RequestHandler } from "express";
import { randomBytes } from "crypto";
import { validationResult } from "express-validator";
import { clerkClient } from "@clerk/clerk-sdk-node";

import User from "../models/User";
import logger from "../utils/logger";

// Lazy import io to avoid loading server during tests
let io: any;
const getIo = () => {
  if (!io && process.env.NODE_ENV !== 'test') {
    try {
      io = require("../server").io;
    } catch (error) {
      // Server not started yet or in test environment
    }
  }
  return io;
};

export const getPath: RequestHandler = async (req, res) => {
  try {
    const clerkUser = await clerkClient.users.getUser(req.userId);
    const regenerate = req.query.regenerate === 'true';

    const updateObj: any = {};
    if (regenerate) {
      updateObj.path = randomBytes(8).toString("hex");
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId: req.userId },
      {
        $setOnInsert: {
          clerkUserId: req.userId,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          path: regenerate ? updateObj.path : randomBytes(8).toString("hex"),
          messages: [],
        },
        ...updateObj,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ path: user.path, regenerated: regenerate });
  } catch (err) {
    logger.error('Error generating path', err);
    res.status(500).json({ error: "Failed to generate path" });
  }
};

// comment this when switching back to socket io
// ------------------------------------------
export const postMessage: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const path = req.params.userpath;

    const user = await User.findOne({ path });

    if (!user) {
      return res.status(404).json({ error: "invalid URL" });
    }

    const message = req.body.message;
    user.messages.push(message);
    await user.save();

    const ioInstance = getIo();
    if (ioInstance) {
      ioInstance.to(path).emit("newMessage", message);
      logger.info(`Emitted newMessage to room: ${path}`);
    }

    res.status(201).json({ message: "message sent successfully" });
  } catch (err) {
    logger.error('Error posting message', err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const clerkUser = await clerkClient.users.getUser(req.userId);

    const user = await User.findOneAndUpdate(
      { clerkUserId: req.userId },
      {
        $setOnInsert: {
          clerkUserId: req.userId,
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          path: randomBytes(8).toString("hex"),
          messages: [],
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ messages: user.messages.reverse(), path: user.path });
  } catch (err) {
    logger.error('Error getting messages', err);
    res.status(500).json({ error: "an error occurred" });
  }
};

// -----------------------------------------------
