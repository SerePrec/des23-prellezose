import ValidateDataService from "../services/validateDataService.js";

const validateDataService = new ValidateDataService();

// Valida que sea un formato de usuario válido para guardar en la BD
const validateRegisterPost = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (validateDataService.validateRegisterPost(username, password)) {
    await next();
  } else {
    ctx.redirect("/register");
  }
};

export { validateRegisterPost };
