import { RequestHandler } from "express";
import { randomBytes } from "crypto";

import User from "../models/User";

export const getPath: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user.path) {
      const generatedPath = randomBytes(12).toString("hex");
      user.path = generatedPath;
      await user.save();
      return res.status(200).json({ path: generatedPath });
    }

    return res.status(200).json({ path: user.path });
  } catch (err) {
    console.log(err);
  }
};
