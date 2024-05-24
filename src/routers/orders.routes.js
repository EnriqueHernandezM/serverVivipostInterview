import MenuController from "../controller/menu.controller.js";

/* import OrdersController from "../controller/orders.controller.js";
import checkAuth from "../middlewares/auth.js"; */

export default class Router {
  constructor() {
    this.controller = new MenuController();
    this.allRoutes = [
      "/",
      "/add_menu_element/",
      "/modified_element/",
      "/delete_element/",
    ];
  }

  async routerMyServer(req, res) {
    const validateRoutes = new Set(this.allRoutes);
    const { url, method } = req;
    const indexToSeparateUrl = url.lastIndexOf("/");
    const urlExtract = url.slice(0, indexToSeparateUrl + 1);
    if (validateRoutes.has(urlExtract)) {
      switch (method) {
        case "GET":
          await this.controller.getMenu(req, res);
          break;
        case "POST":
          await this.controller.postElementToMenu(req, res);
          break;
        case "PUT":
          await this.controller.updateElementOfMenu(req, res);
          break;
        case "DELETE":
          await this.controller.deleteOneElement(req, res);
          break;
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
    res.end();
  }
}
