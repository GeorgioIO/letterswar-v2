import { Router } from "express";
import { loginController } from "./auth.controller.js";
import { LoginLimitter } from "../../middleware/rate-limiter.js";

const router = Router();

router.post("/login", LoginLimitter, loginController);

export default router;
