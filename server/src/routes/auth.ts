import { Router } from "express";
import * as authControllers from "../controllers/auth";
import { body } from "express-validator";

const router = Router();

router.post(
  "/signup",
  [
    body("firstName")
      .notEmpty()
      .isAlphanumeric()
      .withMessage("first name cannot be empty"),
    body("lastName")
      .notEmpty()
      .isAlphanumeric()
      .withMessage("last name cannot be empty"),
    body("email").isEmail().withMessage("please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be atleast 8 characters"),
  ],
  authControllers.signup
);

export default router;
