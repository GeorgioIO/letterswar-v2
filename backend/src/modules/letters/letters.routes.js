import Router from "express";
import { getAll } from "./letters.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", getAll);

export default router;
