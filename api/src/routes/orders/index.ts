import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrdersSchema,
  insertOrdersWithItemsSchema,
  updateOrderSchema,
} from "../../db/orders.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrdersWithItemsSchema),
  createOrder
);

router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
