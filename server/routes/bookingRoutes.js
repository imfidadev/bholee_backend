const express = require("express");
const router = express.Router();
const controller = require("@controllers/bookingController");
const { validate } = require("@base/middlewares");
const { paymentIntentSchema } = require("@base/validation");

router
  .route("/booking/payment-intent")
  .post(validate(paymentIntentSchema), controller.createPaymentIntent);

module.exports = router;
