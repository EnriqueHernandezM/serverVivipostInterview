import express from "express";
const app = express();
import http from "http";
const httpServer = http.createServer(app);
import config from "./config/config.js";
import orders from "./routers/orders.routes.js";
export default class InitServer {
  constructor() {
    this.PORT = config.PORT;
    this.app = app;
    this.httpServer = httpServer;
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.app.use("/", orders);
  }
  listen() {
    httpServer.listen(this.PORT, () =>
      console.log(`✅ SERVER ON http://localhost:${this.PORT}`)
    );
  }
}
