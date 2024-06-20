const { apiResponse } = require("@utils");
const config = require("@config");
const mailRoutes = require("./mailRoutes");
const postRoutes = require("./postRoutes");
const bookingRoutes = require("./bookingRoutes");

module.exports = (app) => {
  app.use(`/${config.apiPrefix}`, mailRoutes);
  app.use(`/${config.apiPrefix}`, bookingRoutes);
  app.use(`/${config.apiPrefix}`, postRoutes);
  app.use(`/${config.apiPrefix}`, (req, res) => {
    return apiResponse(
      req,
      res,
      {},
      404,
      `No API route found: ${config.apiPrefix}${req.path}`
    );
  });
};
