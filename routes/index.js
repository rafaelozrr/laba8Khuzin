import { Router } from "express";
import { postRouter } from "./postRouter.js";
import { userRouter } from "./userRouter.js";
import { categoryRouter } from "./categoryRouter.js";
import { productRouter } from "./productRouter.js";

const router = new Router();

router.use(userRouter);
router.use(postRouter);
router.use(categoryRouter);
router.use(productRouter);

export { router };