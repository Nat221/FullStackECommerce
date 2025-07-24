import { Router } from "express";
import { createPaymentIntent, getKeys } from "./stripeController";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/payment-intent", createPaymentIntent);
router.get("/keys", getKeys);

export default router;
