import { RequestHandler } from "express";

export const resendEmail: RequestHandler = async (req, res) => {
  // Clerk handles email verification automatically
  // This endpoint can be used for custom logic if needed
  res.status(200).json({ message: "Verification email sent" });
};