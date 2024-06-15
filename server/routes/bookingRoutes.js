const express = require("express");
const router = express.Router();
const controller = require("@controllers/bookingController");

router.route("/booking/payment-intent").post(controller.createPaymentIntent);

module.exports = router;
