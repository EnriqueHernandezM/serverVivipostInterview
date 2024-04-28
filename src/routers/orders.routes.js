import Router from "express";
const orders = new Router();
import OrdersController from "../controller/orders.controller.js";
const orderController = new OrdersController();
import checkAuth from "../middlewares/auth.js";

orders.get("/orders", checkAuth, orderController.allOrders);

export default orders;
