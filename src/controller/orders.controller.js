import OrdersService from "../service/orders.service.js";
const ordersService = new OrdersService();

export default class OrdersController {
  constructor() {}
  async allOrders(req, res) {
    try {
      const catchAllOrders = await ordersService.allOrders();
      res.status(200).json(catchAllOrders);
    } catch (error) {
      throw error;
    }
  }
}
