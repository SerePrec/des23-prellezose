import { logger } from "../logger/index.js";
class Error404Controller {
  getError404Api = async (ctx, next) => {
    logger.warn(`ruta '${ctx.path}' método '${ctx.method}' no implementada`);
    ctx.status = 404;
    ctx.body = {
      error: "No existe el recurso",
      descripcion: `ruta '${ctx.path}' método '${ctx.method}' no implementada`
    };
  };

  getError404Web = async (ctx, next) => {
    logger.warn(`ruta '${ctx.path}' método '${ctx.method}' no implementada`);
    await ctx.render("404");
  };
}

export default Error404Controller;
