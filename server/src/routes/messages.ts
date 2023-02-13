import { Router } from "express";
import { body } from "express-validator";

import isAuth from "../middlewares/isAuth";
import { getPath, postMessage, getMessages } from "../controllers/messages";

const router = Router();

router.get("/path", isAuth, getPath);

router.post(
  "/:userpath",
  body("message")
    .trim()
    .notEmpty()
    .withMessage("please provide a 'message' with the request"),
  postMessage
);

router.get("/", isAuth, getMessages);

export default router;
