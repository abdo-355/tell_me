import { Router } from "express";
import { body, cookie } from "express-validator";
import passport from "passport";

import * as authControllers from "../controllers/auth";
import "../strategies/auth-stratigies";

const router = Router();

router.get("/", (req, res) => {
  res.send("the auth route");
});

router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name can't be empty")
      .bail()
      // if the first name is empty the is alpha  will never run
      .isAlpha(
        "ar" ||
          "ar-AE" ||
          "ar-BH" ||
          "ar-DZ" ||
          "ar-EG" ||
          "ar-IQ" ||
          "ar-JO" ||
          "ar-KW" ||
          "ar-LB" ||
          "ar-LY" ||
          "ar-MA" ||
          "ar-QA" ||
          "ar-QM" ||
          "ar-SA" ||
          "ar-SD" ||
          "ar-SY" ||
          "ar-TN" ||
          "ar-YE" ||
          "az-AZ" ||
          "bg-BG" ||
          "cs-CZ" ||
          "da-DK" ||
          "de-DE" ||
          "el-GR" ||
          "en-AU" ||
          "en-GB" ||
          "en-HK" ||
          "en-IN" ||
          "en-NZ" ||
          "en-US" ||
          "en-ZA" ||
          "en-ZM" ||
          "es-ES" ||
          "fa-AF" ||
          "fa-IR" ||
          "fr-FR" ||
          "he" ||
          "hu-HU" ||
          "id-ID" ||
          "it-IT" ||
          "ku-IQ" ||
          "nb-NO" ||
          "nl-NL" ||
          "nn-NO" ||
          "pl-PL" ||
          "pt-BR" ||
          "pt-PT" ||
          "ru-RU" ||
          "sk-SK" ||
          "sl-SI" ||
          "sr-RS" ||
          "sr-RS@latin" ||
          "sv-SE" ||
          "th-TH" ||
          "tr-TR" ||
          "uk-UA" ||
          "vi-VN"
      )
      .withMessage("first name must be valid"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name can't be empty")
      .bail()
      // if the first name is empty the is alpha  will never run
      .isAlpha(
        "ar" ||
          "ar-AE" ||
          "ar-BH" ||
          "ar-DZ" ||
          "ar-EG" ||
          "ar-IQ" ||
          "ar-JO" ||
          "ar-KW" ||
          "ar-LB" ||
          "ar-LY" ||
          "ar-MA" ||
          "ar-QA" ||
          "ar-QM" ||
          "ar-SA" ||
          "ar-SD" ||
          "ar-SY" ||
          "ar-TN" ||
          "ar-YE" ||
          "az-AZ" ||
          "bg-BG" ||
          "cs-CZ" ||
          "da-DK" ||
          "de-DE" ||
          "el-GR" ||
          "en-AU" ||
          "en-GB" ||
          "en-HK" ||
          "en-IN" ||
          "en-NZ" ||
          "en-US" ||
          "en-ZA" ||
          "en-ZM" ||
          "es-ES" ||
          "fa-AF" ||
          "fa-IR" ||
          "fr-FR" ||
          "he" ||
          "hu-HU" ||
          "id-ID" ||
          "it-IT" ||
          "ku-IQ" ||
          "nb-NO" ||
          "nl-NL" ||
          "nn-NO" ||
          "pl-PL" ||
          "pt-BR" ||
          "pt-PT" ||
          "ru-RU" ||
          "sk-SK" ||
          "sl-SI" ||
          "sr-RS" ||
          "sr-RS@latin" ||
          "sv-SE" ||
          "th-TH" ||
          "tr-TR" ||
          "uk-UA" ||
          "vi-VN"
      )
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

// re-send verification email
router.post("/resend-email", authControllers.resendEmail);

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
    failureRedirect: `${process.env.FRONT_END}/auth/login`,
  }),
  (req, res) => {
    res.redirect(process.env.FRONT_END);
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
    failureRedirect: `${process.env.FRONT_END}/auth/login`,
  }),
  (req, res) => {
    res.redirect(process.env.FRONT_END);
  }
);

// getting the user token
router.get("/getuser", authControllers.getUser);

export default router;
