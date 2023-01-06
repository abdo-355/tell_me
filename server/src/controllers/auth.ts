import { RequestHandler } from "express";

export const signup: RequestHandler = (req, res, next) => {
  const userData = req.body;
  console.log(userData);
  res.json({ message: "success", data: userData });
};
