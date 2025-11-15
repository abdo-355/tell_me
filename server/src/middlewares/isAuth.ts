import { RequestHandler } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

interface ClerkAuth {
  userId: string;
  user: {
    firstName?: string;
    lastName?: string;
    emailAddresses?: { emailAddress: string }[];
  };
}

// to save the userId in the request object
declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth: ClerkAuth;
    }
  }
}

const clerkAuth = ClerkExpressRequireAuth();

const isAuth: RequestHandler = (req, res, next) => {
  clerkAuth(req, res, (err) => {
    if (err) return next(err);
    req.userId = req.auth.userId;
    next();
  });
};

export default isAuth;
