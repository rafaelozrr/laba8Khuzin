import { Router } from "express";
import { orderItemController } from "../controllers/orderItemController.js";
import { checkMiddelware } from "../checkMiddleware.js";

const router = new Router();

router.post("/order-items", checkMiddelware, orderItemController.create);
router.get("/order-items", checkMiddelware, orderItemController.getAll);
router.get("/order-items/:id", checkMiddelware, orderItemController.getOne);
router.put("/order-items", checkMiddelware, orderItemController.update);
router.delete("/order-items/:id", checkMiddelware, orderItemController.delete);

export const orderItemRouter = router;