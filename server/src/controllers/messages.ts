import { RequestHandler } from "express";
import { randomBytes } from "crypto";
import { validationResult } from "express-validator";
import { clerkClient } from "@clerk/clerk-sdk-node";

import User from "../models/User";
import { io } from "../server";

export const getPath: RequestHandler = async (req, res) => {
  try {
    let user = await User.findOne({ clerkUserId: req.userId });

    if (!user) {
      // Create user if not exists
      const clerkUser = await clerkClient.users.getUser(req.userId);
      user = new User({
        clerkUserId: req.userId,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
      });
      await user.save();
    }

    const regenerate = req.query.regenerate === 'true';

    if (!user.path || regenerate) {
      const generatedPath = randomBytes(8).toString("hex");
      user.path = generatedPath;
      await user.save();
      return res.status(200).json({ path: generatedPath, regenerated: regenerate });
    }

    return res.status(200).json({ path: user.path, regenerated: false });
  } catch (err) {
    console.log(err);
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

    io.to(path).emit("newMessage", message);
    console.log("emitted newMessage to", path);

    res.status(201).json({ message: "message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    let user = await User.findOne({ clerkUserId: req.userId });

    if (!user) {
      // Create user if not exists
      const clerkUser = await clerkClient.users.getUser(req.userId);
      user = new User({
        clerkUserId: req.userId,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
      });
      await user.save();
    }

    res.status(200).json({ messages: user.messages.reverse(), path: user.path });
  } catch (err) {
    res.status(500).json({ error: "an error occurred" });
  }
};

// -----------------------------------------------
