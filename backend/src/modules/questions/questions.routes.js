import { Router } from "express";
import * as questionsControllers from "./questions.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", questionsControllers.getAll);
router.get("/:id", questionsControllers.getOne);
router.post("/", questionsControllers.create);
router.put("/:id", questionsControllers.update);
router.delete("/:id", questionsControllers.remove);

export default router;
