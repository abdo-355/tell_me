import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { config } from "dotenv";

import User from "../models/User";

config();

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);

    console.log(errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(hashedPassword);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      messages: [],
    });

    await user.save();

    res.json({ message: "user signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: "an error occurred" });
  }
};
