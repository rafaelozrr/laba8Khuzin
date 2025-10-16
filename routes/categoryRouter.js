import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";

const router = new Router();

router.post("/categories", categoryController.create);
router.get("/categories", categoryController.getAll);
router.put("/categories", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

export const categoryRouter = router;