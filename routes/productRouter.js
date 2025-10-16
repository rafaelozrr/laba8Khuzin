import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = new Router();

router.post("/products", productController.create);
router.get("/products", productController.getAll);
router.get("/products/:id", productController.getOne);
router.put("/products", productController.update);
router.delete("/products/:id", productController.delete);

export const productRouter = router;