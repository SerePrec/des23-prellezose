const isAuthWeb = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const isAuthApi = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: "No autenticado",
    descripcion: `ruta '${req.baseUrl + req.path}' método '${
      req.method
    }' necesita autenticación`
  });
};

export { isAuthWeb, isAuthApi };
