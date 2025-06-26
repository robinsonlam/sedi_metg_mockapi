import type { Request, Response } from "express";
import { GetOrdersQuery } from "../types/orders.types";
import {
  searchOrders,
  createOrder,
  updateOrder,
} from "../services/orders.service";

// * Note: Could probably paginate..
async function get(req: Request<GetOrdersQuery>, res: Response) {
  try {
    const result = await searchOrders(req.query);
    res.json(result);
  } catch (error) {
    console.error("get searchOrders - Error searching orders:", error);
    res.status(500).json({ message: "Search Orders - internal server error" });
  }
}

async function post(req: Request<GetOrdersQuery>, res: Response) {
  try {
    const result = await createOrder(req.body);
    res.json(result);
  } catch (error) {
    console.error("post createOrder - Error creating orders:", error);
    res.status(500).json({ message: "Create Orders - internal server error" });
  }
}

async function put(req: Request<{ orderId: string }, any, any>, res: Response) {
  try {
    const { orderId } = req.params;
    const orderData = req.body;

    const result = await updateOrder(orderId, orderData);
    res.json(result);
  } catch (error) {
    console.error("put updateOrder - Error updating orders:", error);
    res.status(500).json({ message: "Update Orders - internal server error" });
  }
}

export default {
  get,
  post,
  put,
};
