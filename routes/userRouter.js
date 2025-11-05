import fileUpload from "express-fileupload";
import { userController } from "../controllers/userController.js";
import { checkMiddelware } from "../checkMiddleware.js";
import { Router } from "express";


const router = new Router();

// Пользователь
router.post("/users",checkMiddelware, userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", checkMiddelware, userController.getOne);
router.put("/users", userController.update);
router.get("/users/activate/:link", userController.activate);
router.delete("/users/:id", checkMiddelware, userController.delete);
router.post('/registration', userController.registration);
router.post('/login', userController.login)
router.post('/check',checkMiddelware, userController.check)
router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password/:token', userController.resetPassword)


export const userRouter = router;