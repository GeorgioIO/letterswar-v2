import Router from "express";
import { generate } from "./board.controller.js";

const router = Router();

router.get("/generate", generate);

export default router;
