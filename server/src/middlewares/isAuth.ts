import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

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

  jwt.verify(token, process.env.SECRET_KEY, (err, user: { userId: string }) => {
    if (err) return res.status(401).json({ message: err.message });

    req.userId = user.userId;
    next();
  });
};

export default isAuth;
