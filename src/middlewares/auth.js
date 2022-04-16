const isAuthWeb = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return await next();
  }
  ctx.redirect("/login");
};

const isAuthApi = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return await next();
  }
  ctx.status = 401;
  ctx.body = {
    error: "No autenticado",
    descripcion: `ruta '${ctx.path}' método '${ctx.method}' necesita autenticación`
  };
};

export { isAuthWeb, isAuthApi };
