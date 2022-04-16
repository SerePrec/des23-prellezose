import Koa from "koa";
import render from "koa-ejs";
import koaBody from "koa-body";
import koaCompress from "koa-compress";
import serve from "koa-static";
import session from "koa-session";
import MongooseStore from "koa-session-mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";
import { passport } from "./middlewares/passport.js";
import ApiRouter from "./routes/apiRouter.js";
import AuthRouter from "./routes/authRouter.js";
import WebServerRouter from "./routes/webServerRouter.js";
import Error404Controller from "./controllers/error404Controller.js";
import config from "./config.js";
import { logger } from "./logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const error404Controller = new Error404Controller();
const apiRouter = new ApiRouter();
const authRouter = new AuthRouter();
const webServerRouter = new WebServerRouter();

const app = new Koa();

// configuración motor de plantillas
render(app, {
  root: path.join(__dirname, "views"),
  layout: false,
  viewExt: "html",
  cache: false
});

// middleware para parsear el body del request
app.use(koaBody({ multipart: true }));

// compresión de respuestas
app.use(
  koaCompress({
    filter(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: zlib.constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: zlib.constants.Z_SYNC_FLUSH
    },
    br: false // disable brotli
  })
);

// middleware para loguear cada request
app.use(async (ctx, next) => {
  logger.info(`[Request] '${ctx.path}' método [${ctx.method}]`);
  await next();
});

// servir archivos estáticos
app.use(serve(path.join(__dirname, "public")));

// sesiones. SESSION STORE: MONGOSTORE
app.keys = [config.session.secret];
app.use(
  session(
    {
      store: new MongooseStore(),
      ...config.session.options
    },
    app
  )
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use(authRouter.start().routes());
app.use(webServerRouter.start().routes());
app.use(apiRouter.start().routes());

// error 404 WEB
app.use(error404Controller.getError404Web);

export default app;
