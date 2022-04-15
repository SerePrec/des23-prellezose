import ValidateDataService from "../services/validateDataService.js";

const validateDataService = new ValidateDataService();

// Valida que sea un formato de usuario válido para guardar en la BD
const validateRegisterPost = (req, res, next) => {
  const { username, password } = req.body;
  if (validateDataService.validateRegisterPost(username, password)) {
    next();
  } else {
    res.redirect("/register");
  }
};

export { validateRegisterPost };
