import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { checkMiddelware } from "../checkMiddleware.js";

const router = new Router();

router.post("/orders", checkMiddelware, orderController.create); 
router.get("/orders", checkMiddelware, orderController.getAll); 
router.get("/orders/:id", checkMiddelware, orderController.getOne); 
router.put("/orders", checkMiddelware, orderController.update); 
router.delete("/orders/:id", checkMiddelware, orderController.delete); 


router.get("/users/:userId/orders", checkMiddelware, orderController.getUserOrders);

export const orderRouter = router;