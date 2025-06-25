import type { Request, Response } from "express";
import { GetOrdersQuery } from "../types/orders.types";
import { searchOrders } from "../services/orders.service";

// * Note: Could probably paginate..
async function get(req: Request<GetOrdersQuery>, res: Response) {
  try {
    const result = await searchOrders(req.query);
    res.json(result);
  } catch (error) {
    console.error("searchOrders - Error searching orders:", error);
    res.status(500).json({ message: "Search Orders - internal server error" });
  }
}

export default {
  get,
};
