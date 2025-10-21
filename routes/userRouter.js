import { Router } from "express";
import { userController } from "../controllers/userController.js";


const router = new Router();

// Пользователь
router.post("/users", userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOne);
router.put("/users", userController.update);
router.delete("/users/:id", userController.delete);
router.post('/registration', userController.registration);
router.post('/login', userController.login)


export const userRouter = router;