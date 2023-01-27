import { Router } from "express";

import isAuth from "../middlewares/isAuth";
import { getPath } from "../controllers/messages";

const router = Router();

router.get("/path", isAuth, getPath);

export default router;
