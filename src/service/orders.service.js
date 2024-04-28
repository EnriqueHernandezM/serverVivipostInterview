import OrdersSchema from "../models/orders.model.js";
import Decimal from "decimal.js-light";
export default class OrdersService {
  constructor() {
    this.ordersSchema = new OrdersSchema();
  }

  async allOrders() {
    try {
      const obtainProductsAllOrders =
        await this.ordersSchema.consultProductsAllOrders();

      const productsModified = this.analyzeAndChangePrice(
        obtainProductsAllOrders
      );

      const obtainInfoUserAllOrders =
        await this.ordersSchema.consultInfoUsersAllOrders();

      obtainInfoUserAllOrders.forEach((element, i) => {
        obtainInfoUserAllOrders[i].products = productsModified.filter((el) => {
          return el.id_order === element.id_order;
        });
      });

      return obtainInfoUserAllOrders;
    } catch (error) {
      console.log(`${error} in_service_orders`);
    }
  }
  analyzeAndChangePrice(products) {
    try {
      const weightToFree = 300; //in g
      const costForEachHundredG = 0.5;
      products.forEach((oneProduct) => {
        const costByVolume = this.increasePriceByVolume(
          oneProduct.height,
          oneProduct.length,
          oneProduct.width
        );
        if (oneProduct.weight < weightToFree) oneProduct.price = "0.00";
        //increment by each 100g
        if (oneProduct.weight >= weightToFree) {
          const howManyIncrese = Math.floor(oneProduct.weight / 100);
          const realIncreaseForWeigth = howManyIncrese * costForEachHundredG;

          const actualizedPrice = parseFloat(
            +realIncreaseForWeigth + +oneProduct.price + +costByVolume
          ).toFixed(2);
          oneProduct.price = actualizedPrice;
        }
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
  increasePriceByVolume(heightP, lengthP, widthP) {
    try {
      const volumeOfTheProduct = heightP * lengthP * widthP;
      const numOfCategory = Math.ceil(volumeOfTheProduct / 5000).toFixed(0);
      const baseCostExtra = new Decimal(0.1);
      const factorToMultiply = new Decimal(1.2);
      const operationDefineExtra = baseCostExtra
        .mul(factorToMultiply.toPower(numOfCategory - 1))
        .toNumber();
      return operationDefineExtra;
    } catch (error) {
      throw error;
    }
  }
}
