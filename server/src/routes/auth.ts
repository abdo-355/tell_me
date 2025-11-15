import { Router } from "express";

import isAuth from "../middlewares/isAuth";
import { resendEmail } from "../controllers/auth";

const router = Router();

router.post("/resend-email", isAuth, resendEmail);

export default router;