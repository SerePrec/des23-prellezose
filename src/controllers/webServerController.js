import config from "../config.js";

class WebServerController {
  getHome = async ctx => {
    const { messages } = ctx.session;
    let message;
    if (messages) {
      ctx.session.messages = [];
      message = messages[messages.length - 1];
    }
    await ctx.render("./pages/home", {
      title: "Carga de productos y Chat",
      username: ctx.state.user?.username,
      successRegister: message
    });
  };

  getProductosMock = async ctx => {
    await ctx.render("productos-mock");
  };

  showAppInfo = async ctx => {
    const info = {
      title: "App Info",
      SO: process.platform,
      nodeVersion: process.version,
      execPath: process.execPath,
      proyectPath: process.cwd(),
      args:
        process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno",
      pid: process.pid,
      rss: Math.round(process.memoryUsage().rss / 1024),
      CPUs: config.numCPUs
    };
    await ctx.render("./pages/appInfo", info);
  };
}

export default WebServerController;
