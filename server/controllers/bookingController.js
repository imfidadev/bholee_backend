const { apiResponse } = require("@utils");
const config = require("@config");

const stripe = require("stripe")(config.stripeSecretKey);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "usd", receipt_email, metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(amount),
      currency,
      automatic_payment_methods: { enabled: true },
      receipt_email,
      metadata,
    });

    apiResponse(
      req,
      res,
      { clientSecret: paymentIntent.client_secret },
      200,
      `Created successfully`
    );
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};
