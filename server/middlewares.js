const path = require("path");
const express = require("express");
const logger = require("@base/logger");
const validation = require("@base/validation");

exports.validate = (schema, source, validationOpts) => (req, res, next) => {
  if (!source) source = (request) => request.body;
  validationOpts || (validationOpts = { allowUnknown: true });

  const dataToValidate = source(req, res);
  const { error, value } = validation.validate(
    dataToValidate,
    schema,
    validationOpts
  );

  if (error) {
    logger.warn(`Payload validation error:`, error);
    return res.status(400).json({ error, success: false });
  }

  req.schema = schema;
  req.values = value;

  return next();
};

exports.staticFileMiddleware = express.static(
  path.join(__dirname, "../public")
);
