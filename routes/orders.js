import express from "express";
import ordersController from "../controllers/orders.ts";

const router = express.Router();

// * GET /orders (search orders)
router.get("/", ordersController.get);

// * POST /orders (create a new order)
router.post("/", ordersController.post);

// * PUT /orders/:id (update an order)
router.put("/:id", ordersController.put);

export default router;
