import express from "express";
import session from "express-session";
import compression from "compression";
import MongoStore from "connect-mongo";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { passport } from "./middlewares/passport.js";
import { isAuthApi } from "./middlewares/auth.js";
import Error404Controller from "./controllers/error404Controller.js";
import config from "./config.js";
import authRouter from "./routes/authRouter.js";
import webServerRouter from "./routes/webServerRouter.js";
import apiRouter from "./routes/apiRouter.js";
import { logger } from "./logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const error404Controller = new Error404Controller();

const app = express();

// configuración motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares para parsear el body del request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// compresión de respuestas
app.use(compression());

// middleware para loguear cada request
app.use((req, res, next) => {
  logger.info(`[Request] '${req.baseUrl + req.path}' método [${req.method}]`);
  next();
});

// servir archivos estáticos
app.use(express.static(path.join(__dirname, "public"))); // comentar si utilizo Nginx como servidor de recursos estáticos

// sesiones. SESSION STORE: MONGOSTORE
app.use(
  session({
    store: MongoStore.create(config.session.mongoStoreOptions),
    ...config.session.options
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use(authRouter.start());
app.use(webServerRouter.start());
app.use("/api", isAuthApi, apiRouter.start());

// error 404 API
app.use("/api", error404Controller.getError404Api);

// error 404 WEB
app.use(error404Controller.getError404Web);

export default app;
