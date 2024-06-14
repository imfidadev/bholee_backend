require("dotenv").config();
require("module-alias/register");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const http = require("http");

const logger = require("@base/logger");
const config = require("@config");
const middlewares = require("@base/middlewares");

const promiseApp = async () => {
  return new Promise((resolve) => {
    const app = express();

    app.disable("x-powered-by");
    app.enable("trust proxy");

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(methodOverride());

    app.set("view engine", config.viewEngine.engine);
    app.set("views", config.viewEngine.options.views);

    app.use(cors(config.cors));

    app.use("/public", middlewares.staticFileMiddleware);

    app.use(bodyParser.json({ limit: "20mb" }));

    require("@routes")(app);
    resolve(app);
  });
};

const promiseServer = async (app) => {
  return new Promise((resolve) => {
    const server = http.Server(app);
    resolve(server);
  });
};

const promiseRun = (server) => {
  return new Promise((resolve) => {
    server.listen(config.port, () => {
      logger.info(`Server started and listening on the port ${config.port}`);
      resolve();
    });
  });
};

const initialize = async () => {
  const app = await promiseApp();
  const server = await promiseServer(app);
  logger.info("Server initialized.");
  await promiseRun(server);
};

initialize();
