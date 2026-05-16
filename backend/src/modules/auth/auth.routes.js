import { Router } from "express";
import {
  loginController,
  logoutController,
  meController,
} from "./auth.controller.js";
import { LoginLimitter } from "../../middleware/rate-limiter.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.post("/login", LoginLimitter, loginController);
router.post("/logout", logoutController);
router.get("/me", authenticate, meController);

export default router;
