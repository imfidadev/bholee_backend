const path = require("path");

const config = {
  environment: process.env.NODE_ENV || "development", // 'development', 'production'
  port: process.env.PORT || 3000,
  logLevel: process.env.LOG_LEVEL || "info", // 'error', 'warn', 'info', 'verbose', 'debug', 'silly',
  baseURL: process.env.APP_BASE_URL || "http://localhost:3000",
  apiPrefix: "api",
  viewEngine: {
    engine: "ejs",
    options: {
      views: path.resolve(__dirname, "../views"),
    },
  },
  cors: {
    origin: "*",
    methods: ["DELETE", "POST", "GET", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    userName: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    toAddress: process.env.MAIL_TO_ADDRESS,
  },
};

module.exports = config;
