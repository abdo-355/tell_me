import { RequestHandler } from "express";
import { randomBytes } from "crypto";
import { validationResult } from "express-validator";

import User from "../models/User";

export const getPath: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user.path) {
      const generatedPath = randomBytes(8).toString("hex");
      user.path = generatedPath;
      await user.save();
      return res.status(200).json({ path: generatedPath });
    }

    return res.status(200).json({ path: user.path });
  } catch (err) {
    console.log(err);
  }
};

// this got replaced with socket io
// ----------------------------------------
// export const postMessage: RequestHandler = async (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(403).json({ errors: errors.array() });
//     }

//     const path = req.params.userpath;

//     const user = await User.findOne({ path });

//     if (!user) {
//       return res.status(404).json({ error: "invalid URL" });
//     }

//     const message = req.body.message;
//     user.messages.push(message);
//     await user.save();

//     res.status(201).json({ message: "message sent successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// export const getMessages: RequestHandler = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);

//     res.status(200).json({ messages: user.messages });
//   } catch (err) {
//     res.status(500).json({ error: "ab error occured" });
//   }
// };

// -----------------------------------------------
