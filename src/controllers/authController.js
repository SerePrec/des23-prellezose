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

  getLogout = async ctx => {
    if (ctx.isAuthenticated()) {
      const { username } = ctx.state.user;
      ctx.logout();
      ctx.session = null;
      ctx.cookies.set("koa.sess", null, { signed: true });
      return await ctx.render("./pages/logout", {
        title: "Logout",
        username
      });
    } else {
      ctx.redirect("/");
    }
  };
}

export default AuthController;
