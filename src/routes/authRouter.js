import { Router } from "express";
import { validateRegisterPost } from "../middlewares/validateWebData.js";
import {
  passportAuthLogin,
  passportAuthRegister
} from "../middlewares/passport.js";
import AuthController from "../controllers/authController.js";

const router = Router();

class AuthRouter {
  constructor() {
    this.authController = new AuthController();
  }

  start() {
    router.get("/login", this.authController.getLogin);

    router.post("/login", passportAuthLogin);

    router.get("/login-error", this.authController.getLoginError);

    router.get("/register", this.authController.getRegister);

    router.post("/register", validateRegisterPost, passportAuthRegister);

    router.get("/register-error", this.authController.getRegisterError);

    router.get("/logout", this.authController.getLogout);

    return router;
  }
}

export default new AuthRouter();
