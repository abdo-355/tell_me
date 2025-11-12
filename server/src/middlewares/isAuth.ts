import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import User from "../models/User";

// to save the userId in the request object
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const isAuth: RequestHandler = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No 'authorization' header was provided" });
  }

  jwt.verify(
    token,
    config.secretKey,
    async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: err.message });

      const { userId } = decoded as { userId: string };

      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!user.verified) {
        return res.status(401).json({ message: "email not verified" });
      }

      req.userId = userId;
      next();
    }
  );
};

export default isAuth;
