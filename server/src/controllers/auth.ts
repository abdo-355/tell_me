import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import crypto from "crypto";

import User from "../models/User";
import sendMail from "../utils/email";

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

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // generate verification code
    const verificationCode = crypto.randomBytes(10).toString("hex");

    const user = new User({
      firstName,
      lastName,
      email,
      verified: false,
      verificationCode,
      password: hashedPassword,
      messages: [],
    });

    await user.save();

    // send verification email
    await sendMail(
      email,
      "Verify your email",
      `
    <p>Thank you for registering on TellMe. Please click on the link below to verify your email:
    </p>
    <a href="${req.protocol}://${req.get(
        "host"
      )}/verify-email/${verificationCode}">
      Verify your email
      </a>
    <p>happy messaging</p>
  `
    );

    res.status(201).json({ message: "email verification sent" });
  } catch (err) {
    console.log(err);
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
    { userId: user._id.toString() },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(202).json({ token });
};
