import http from "http";

import config from "./config/config.js";
import Router from "./routers/orders.routes.js";
//import orders from "./routers/orders.routes.js";

export default class InitServer {
  constructor() {
    const router = new Router();
    this.PORT = config.PORT;
    this.httpServer = http.createServer(function (req, res) {
      router.routerMyServer(req, res);
    });
  }

  listen() {
    this.httpServer.listen(this.PORT, () =>
      console.log(`✅ SERVER ON http://localhost:${this.PORT}`)
    );
  }
}
