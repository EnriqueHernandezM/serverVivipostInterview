//import OrdersService from "../service/orders.service.js";

import MenuService from "../service/menu.service.js";
import bodyParse from "../utils/bodyParse.js";
//const ordersService = new OrdersService();
export default class MenuController {
  constructor() {
    this.menuService = new MenuService();
  }
  async getMenu(req, res) {
    try {
      const elementsOfMenu = await this.menuService.menuElements();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(elementsOfMenu));
    } catch (error) {
      throw error;
    }
  }
  async postElementToMenu(req, res) {
    try {
      await bodyParse(req);
      const { body } = req;
      const createAnElement = await this.menuService.createAnElement(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(createAnElement));
    } catch (error) {
      res.end(JSON.stringify({ message: "values Invalid" }));
      res.writeHead(400, { "Content-Type": "application/json" });
    }
  }
  async updateElementOfMenu(req, res) {
    try {
      await bodyParse(req);
      const { body } = req;
      const urlSegmentsToId = req.url.split("/");
      const modifiedAnElement = await this.menuService.modifiedAnElement(
        urlSegmentsToId[urlSegmentsToId.length - 1],
        body
      );
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(modifiedAnElement));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOneElement(req, res) {
    try {
      const urlSegmentsId = req.url.split("/");
      const deleteAnlement = await this.menuService.deleteAnElement(
        urlSegmentsId[urlSegmentsId.length - 1]
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deleteAnlement));
    } catch (error) {
      console.log(error);
    }
  }
}
