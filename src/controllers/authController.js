import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class AuthController {
  getLogin = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/");
    res.sendFile("login.html", {
      root: path.join(__dirname, "..", "views")
    });
  };

  getLoginError = (req, res) => {
    const { messages } = req.session;
    let message;
    if (messages) {
      req.session.messages = [];
      message = messages[messages.length - 1];
    }
    res.render("pages/loginError", {
      title: "Error de login",
      error: message
    });
  };

  getRegister = (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/");
    res.sendFile("register.html", {
      root: path.join(__dirname, "..", "views")
    });
  };

  getRegisterError = (req, res) => {
    const { messages } = req.session;
    let message;
    if (messages) {
      req.session.messages = [];
      message = messages[messages.length - 1];
    }
    res.render("pages/registerError", {
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
