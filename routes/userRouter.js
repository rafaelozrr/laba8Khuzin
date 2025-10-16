import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { categoryController } from "../controllers/categoryController.js";
import { productController } from "../controllers/productController.js";

const router = new Router();

// Пользователь
router.post("/users", userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOne);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);

// // Категории
// router.post("/categories", categoryController.create);
// router.get("/categories", categoryController.getAll);

// // Продукт
// router.post("/products", productController.create);
// router.get("/products", productController.getAll);
// router.get("/products/:id", productController.getOne);
// router.delete("/products/:id", productController.delete);

export const userRouter = router;