import { GetOrdersQuery } from "../types/orders.types";
import { connect } from "./db.service";

export async function searchOrders({
  orderId,
  customerId,
  placementDateFrom,
  placementDateTo,
  status,
}: GetOrdersQuery) {
  // * Connect to the database
  const db = await connect();

  // * Build the query (I've used MongoDB in this case, as I'm most comfortable)
  const query: any = {};

  if (orderId) {
    query.orderId = { $regex: orderId, $options: "i" }; // * Case-insensitive search, we may not need this if they're numbers
  }
  if (customerId) {
    query.customerId = { $regex: customerId, $options: "i" };
  }
  if (status) {
    query.status = { $regex: status, $options: "i" };
  }

  // * Basic date range search
  if (placementDateFrom || placementDateTo) {
    query.placementDate = {};
    if (placementDateFrom) {
      query.placementDate.$gte = new Date(placementDateFrom);
    }
    if (placementDateTo) {
      query.placementDate.$lte = new Date(placementDateTo);
    }
  }

  const data = await db.collection("orders").find(query).toArray();

  return {
    data,
  };
}
