import { RequestHandler } from "express";

export const getSignup: RequestHandler = (req, res, next) => {
  const userData = req.body;
  console.log(userData);
};
