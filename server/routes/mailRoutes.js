const express = require("express");
const router = express.Router();
const { validate } = require("@base/middlewares");
const { contactUsSchema, bookingSchema } = require("@base/validation");
const controller = require("@controllers/mailController");

router
  .route("/mail/contact-us")
  .post(validate(contactUsSchema), controller.contactUs);

router.route("/mail/booking").post(validate(bookingSchema), controller.booking);

module.exports = router;
