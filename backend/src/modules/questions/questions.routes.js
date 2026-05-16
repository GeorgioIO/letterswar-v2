import { Router } from "express";
import * as questionsControllers from "./questions.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.get("/random", questionsControllers.getRandomOne);
router.use(authenticate);
router.post("/import", questionsControllers.importQuestions);
router.get("/", questionsControllers.getAll);
router.get("/:id", questionsControllers.getOne);
router.post("/", questionsControllers.create);
router.put("/:id", questionsControllers.update);
router.delete("/:id", questionsControllers.remove);
router.patch("/:id/restore", questionsControllers.restore);

export default router;
