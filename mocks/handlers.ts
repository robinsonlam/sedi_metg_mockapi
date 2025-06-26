import { http, HttpResponse } from "msw";

const baseURL = process.env.BASE_URL || "http://localhost:3000";

export const handlers = [
  // GET /orders
  http.get(`/orders`, () => {
    return HttpResponse.json({
      data: [
        {
          orderId: "12345",
          customerId: "cust001",
          placementDate: "2023-10-01T12:00:00Z",
          status: "Pending",
        },
        {
          orderId: "12346",
          customerId: "cust002",
          placementDate: "2023-10-02T14:30:00Z",
          status: "Shipped",
        },
      ],
    });
  }),
  // POST /orders
  http.post(`/orders`, ({ request }) => {
    return request.json().then((data) => {
      return HttpResponse.json({
        success: true,
        orderId: "12347",
      });
    });
  }),
  // PUT /orders/:orderId
  http.put(`/orders/:orderId`, ({ request, params }) => {
    const { orderId } = params;
    return request.json().then((data) => {
      return HttpResponse.json({
        success: true,
        orderId,
      });
    });
  }),
];
