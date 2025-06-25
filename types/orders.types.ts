export interface GetOrdersQuery {
  orderId?: string;
  customerId?: string;
  placementDateFrom?: string; // ISO date string
  placementDateTo?: string; // ISO date string
  status?: string; // e.g., "pending", "shipped", "delivered", etc.
}
