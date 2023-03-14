import { Router } from "express";
import { body } from "express-validator";
import passport from "passport";

import * as authControllers from "../controllers/auth";
import "../strategies/auth-stratigies";

const router = Router();

router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name can't be empty")
      .bail()
      // if the first name is empty the is alpha  will never run
      .isAlpha()
      .withMessage("first name must be valid"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name can't be empty")
      .bail()
      // if the first name is empty the is alpha  will never run
      .isAlpha()
      .withMessage("last name must be valid"),
    body("email").isEmail().withMessage("please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be atleast 8 characters"),
  ],
  authControllers.signup
);

// for email verification
router.get("/verify-email/:verificationCode", authControllers.verifyEmail);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be atleast 8 characters"),
  ],
  authControllers.login
);

// for login with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// for login with google redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/auth/login",
  }),
  (req, res) => {
    // we send the token as cookie
    res.cookie("token", (req.user as { token: string }).token);
    res.redirect("http://localhost:3000");
  }
);

// for login with facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// for login with facebook redirect
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/auth/login",
  }),
  (req, res) => {
    // we send the token as cookie
    res.cookie("token", (req.user as { token: string }).token);
    res.redirect("http://localhost:3000");
  }
);

export default router;
