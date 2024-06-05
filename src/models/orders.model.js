import { connection } from "./connection/connectDb.js";

export default class OrdersSchema {
  constructor() {}
  async consultInfoUsersAllOrders() {
    try {
      const [allOrdersFromDb] = await connection.query(
        "SELECT orders.*, users.name , users.email FROM tbl_order AS orders INNER JOIN tbl_user AS users ON orders.id_user = users.id_user;"
      );
      return allOrdersFromDb;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }
  async consultProductsAllOrders() {
    try {
      const [allProductsOfOrdersFromDb] = await connection.query(
        "SELECT products.*, orderProduct.id_order_product , orderProduct.id_order, orderProduct.quantity FROM tbl_product AS products INNER JOIN tbl_order_product AS orderProduct ON products.id_product = orderProduct.id_product;"
      );
      return allProductsOfOrdersFromDb;
    } catch (error) {
      console.log(`${error} in_db_consult`);
      throw error;
    }
  }
}
