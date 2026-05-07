import * as adminsControllers from "./admins.controller.js";
import { authenticate } from "../../middleware/auth.js";
import { requireSuperAdmin } from "../../middleware/role.js";
import { Router } from "express";

const router = Router();

router.use(authenticate);
router.use(requireSuperAdmin);

router.get("/", adminsControllers.getAll);
router.post("/", adminsControllers.create);
router.put("/:id", adminsControllers.update);
router.delete("/:id", adminsControllers.remove);

export default router;
