import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";
import { checkMiddelware } from "../checkMiddleware.js";

const router = new Router();

router.post("/reviews", checkMiddelware, reviewController.create);
router.get("/reviews", reviewController.getAll);
router.get("/reviews/:id", reviewController.getOne);
router.get("/products/:productId/reviews", reviewController.getByProduct);
router.put("/reviews", checkMiddelware, reviewController.update);
router.delete("/reviews/:id", checkMiddelware, reviewController.delete);

export const reviewRouter = router;