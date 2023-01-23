import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import User from "../models/User";

config();

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      messages: [],
    });

    await user.save();

    res.status(201).json({ message: "user signed up successfully" });
  } catch (err) {
    res.status(500).json({ message: "an error occurred" });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "No such user exists" });
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    return res.status(403).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(202).json({ token });
};
