import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class AuthController {
  getLogin = async ctx => {
    if (ctx.isAuthenticated()) return ctx.redirect("/");
    await ctx.render("login");
  };

  getLoginError = async ctx => {
    const { messages } = ctx.session;
    let message;
    if (messages) {
      ctx.session.messages = [];
      message = messages[messages.length - 1];
    }
    await ctx.render("pages/loginError", {
      title: "Error de login",
      error: message
    });
  };

  getRegister = async ctx => {
    if (ctx.isAuthenticated()) return ctx.redirect("/");
    await ctx.render("register");
  };

  getRegisterError = async ctx => {
    const { messages } = ctx.session;
    let message;
    if (messages) {
      ctx.session.messages = [];
      message = messages[messages.length - 1];
    }
    await ctx.render("pages/registerError", {
      title: "Error de registro",
      error: message
    });
  };

  getLogout = (req, res) => {
    if (req.isAuthenticated()) {
      const { username } = req.user;
      req.logout();
      req.session.destroy(err => {
        if (!err) {
          res.clearCookie("connect.sid");
          return res.render("./pages/logout", { title: "Logout", username });
        }
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  };
}

export default AuthController;
