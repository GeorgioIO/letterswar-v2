import { getAll } from "./stats.controller.js";
import Router from "express";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", getAll);

export default router;
