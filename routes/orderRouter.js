import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { checkMiddelware } from "../checkMiddleware.js";

const router = new Router();

router.post("/orders", checkMiddelware, orderController.create); // создание заказа
router.get("/orders", checkMiddelware, orderController.getAll); // все заказы (админ)
router.get("/orders/:id", checkMiddelware, orderController.getOne); // один заказ
router.put("/orders", checkMiddelware, orderController.update); // обновить
router.delete("/orders/:id", checkMiddelware, orderController.delete); // удалить

// получить заказы пользователя
router.get("/users/:userId/orders", checkMiddelware, orderController.getUserOrders);

export const orderRouter = router;