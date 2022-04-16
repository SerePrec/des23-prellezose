import Koa from "koa";
import render from "koa-ejs";
import koaBody from "koa-body";
import koaCompress from "koa-compress";
import serve from "koa-static";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";
import ApiRouter from "./routes/apiRouter.js";
import Error404Controller from "./controllers/error404Controller.js";
import { logger } from "./logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const error404Controller = new Error404Controller();
const apiRouter = new ApiRouter();

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

// routers
app.use(apiRouter.start().routes());

// error 404 WEB
app.use(error404Controller.getError404Web);

app.use(async ctx => {
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
    CPUs: 20
  };
  await ctx.render("./pages/appInfo", info);
  //ctx.body = "holla";
});

export default app;
