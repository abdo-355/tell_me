import { Router } from "express";
import * as authControllers from "../controllers/auth";
import { body } from "express-validator";

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

router.post("/logout", [
  body("email").isEmail().withMessage("please enter a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
]);

export default router;
