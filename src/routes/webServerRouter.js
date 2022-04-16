import Router from "koa-router";
import { isAuthWeb } from "../middlewares/auth.js";
import WebServerController from "../controllers/webServerController.js";

const router = new Router();

class WebServerRouter {
  constructor() {
    this.webServerController = new WebServerController();
  }

  start() {
    router.get("/", isAuthWeb, this.webServerController.getHome);

    router.get("/info", this.webServerController.showAppInfo);

    router.get(
      "/productos-mock",
      isAuthWeb,
      this.webServerController.getProductosMock
    );

    return router;
  }
}

export default WebServerRouter;
