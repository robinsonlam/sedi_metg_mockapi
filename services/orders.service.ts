import { ObjectId } from "mongodb";
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
  // const db = await connect();

  // // * Build the query (I've used MongoDB in this case, as I'm most comfortable)
  // const query: any = {};

  // if (orderId) {
  //   query.orderId = { $regex: orderId, $options: "i" }; // * Case-insensitive search, we may not need this if they're numbers
  // }
  // if (customerId) {
  //   query.customerId = { $regex: customerId, $options: "i" };
  // }
  // if (status) {
  //   query.status = { $regex: status, $options: "i" };
  // }

  // // * Basic date range search
  // if (placementDateFrom || placementDateTo) {
  //   query.placementDate = {};
  //   if (placementDateFrom) {
  //     query.placementDate.$gte = new Date(placementDateFrom);
  //   }
  //   if (placementDateTo) {
  //     query.placementDate.$lte = new Date(placementDateTo);
  //   }
  // }

  // const data = await db.collection("orders").find(query).toArray();

  return {
    data: [],
  };
}

export async function createOrder(orderData: any) {
  // * Connect to the database
  const db = await connect();

  // * Insert the order into the database
  const result = await db.collection("orders").insertOne(orderData);

  return {
    success: true,
    orderId: result.insertedId,
  };
}

export async function updateOrder(orderId: string, orderData: any) {
  // * Connect to the database
  const db = await connect();

  // * Update the order in the database
  const result = await db
    .collection("orders")
    .updateOne({ _id: new ObjectId(orderId) }, { $set: orderData });

  return {
    success: result.modifiedCount > 0,
  };
}
