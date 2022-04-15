import MessagesFactoryDAO from "./DAOs/messages/MessagesFactoryDAO.js";
import ProductsFactoryDAO from "./DAOs/products/ProductsFactoryDAO.js";
import UsersFactoryDAO from "./DAOs/users/UsersFactoryDAO.js";
import config from "../config.js";
import { logger } from "../logger/index.js";

const PERS = config.PERS;

const productsDAO = await ProductsFactoryDAO.get(PERS);
const messagesDAO = await MessagesFactoryDAO.get(PERS);
const userDAO = await UsersFactoryDAO.get(PERS);

//Inicializo los DAOS
try {
  await productsDAO.init();
  await messagesDAO.init();
  await userDAO.init();
  logger.info(`Persistencia [${config.PERS}] inicializada`);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

export { productsDAO, messagesDAO, userDAO };
