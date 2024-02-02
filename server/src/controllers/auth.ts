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
    // ------------------------------------------
    // const verificationCode = crypto.randomBytes(10).toString("hex");
    // ------------------------------------------

    const user = new User({
      firstName,
      lastName,
      email,
      verified: true,
      // verificationCode,
      password: hashedPassword,
      messages: [],
    });

    await user.save();

    // send verification email
  //   // -------------------------------------
  //   await sendMail(
  //     email,
  //     "Verify your email",
  //     `
  //   <p>Thank you for registering on TellMe. Please click on the link below to verify your email:
  //   </p>
  //   <a href="${req.protocol}://${req.get(
  //       "host"
  //     )}/api/auth/verify-email/${verificationCode}">
  //     Verify your email
  //     </a>
  //   <p>happy messaging</p>
  // `
  //   );
// -------------------------------------------------
    res.status(201).json({ message: "email verification sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "an error occurred" });
  }
};

export const resendEmail: RequestHandler = async (req, res) => {
  const token = req.body.token;

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, { userId }: { userId: string }) => {
      if (err) return res.status(401).json({ message: err.message });

      const user = await User.findById(userId);

      await sendMail(
        user.email,
        "Verify your email",
        `
      <p>Thank you for registering on TellMe. Please click on the link below to verify your email:
      </p>
      <a href="${req.protocol}://${req.get("host")}/auth/verify-email/${
          user.verificationCode
        }">
        Verify your email
        </a>
      <p>happy messaging</p>
    `
      );

      res.status(200).json({ message: "Email verification sent successfully" });
    }
  );
};

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const verificationCode = req.params.verificationCode;

    const user = await User.findOne({ verificationCode });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification code" });
    } else {
      // remove the verification code field and set verified to true
      await User.updateOne(
        { _id: user._id },
        { $unset: { verificationCode: 1 }, $set: { verified: true } }
      );
      res.redirect(`${process.env.FRONT_END}/email/verified`);
    }
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
    { userId: user._id.toString() },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(202).json({ token });
};

export const getUser: RequestHandler = (req, res) => {
  if (req.user) {
    res
      .clearCookie("connect.sid", { path: "/" })
      .json({ token: (req.user as { token: string }).token });
    return 0;
  } else {
    res.json({ message: "No user found" });
  }
};
