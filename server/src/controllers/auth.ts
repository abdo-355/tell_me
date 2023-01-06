import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import User from "../models/User";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ message: errors.array() });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      messages: [],
    });

    await user.save();

    res.json({ message: "user signed up successfully" });
  } catch (err) {
    return res.status(500).json({ message: "an error occurred" });
  }
};
