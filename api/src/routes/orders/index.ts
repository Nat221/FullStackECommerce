import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrdersSchema,
  insertOrdersWithItemsSchema,
} from "../../db/orders.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrdersWithItemsSchema),
  createOrder
);

export default router;
