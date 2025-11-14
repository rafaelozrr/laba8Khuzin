import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { productRouter } from "./productRouter.js";
import { orderRouter } from "./orderRouter.js";
import { orderItemRouter } from "./orderItemRouter.js";
import { reviewRouter } from "./reviewRouter.js";

const router = new Router();

router.use(userRouter);
router.use(postRouter);
router.use(categoryRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(orderItemRouter);
router.use(reviewRouter);

export { router };