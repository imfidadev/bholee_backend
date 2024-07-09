const Joi = require("joi");

const validate = (data, schema, opts = {}) => {
  if (!opts) opts = {};
  const { error, value } = schema.validate(data, {
    abortEarly: true,
    convert: true,
    ...opts,
  });

  if (error)
    return { error: error.details.map((detail) => detail.message), value };

  return { error, value };
};

const contactUsSchema = {
  name: Joi.string().label("Name").required(),
  email: Joi.string().label("email").required(),
  message: Joi.string().allow(null, ""),
};

const bookingSchema = {
  referralCode: Joi.string().label("Referral Code").allow(null, ""),
  email: Joi.string().label("Email").required(),
  firstName: Joi.string().label("First Name").required(),
  lastName: Joi.string().label("Last Name").required(),
  companyName: Joi.string().allow(null, ""),
  phone: Joi.string().label("phone").required(),
  address: Joi.string().label("Address").required(),
  city: Joi.string().label("City").required(),
  postalCode: Joi.string().label("Postal Code").required(),
  paymentId: Joi.string().label("Payment Id").required(),
  amount: Joi.number().label("Amount").required(),
};

const paymentIntentSchema = {
  currency: Joi.string().label("Currency").required(),
  amount: Joi.number().integer().label("Amount").required(),
};

module.exports = {
  validate,
  contactUsSchema: Joi.object(contactUsSchema),
  bookingSchema: Joi.object(bookingSchema),
  paymentIntentSchema: Joi.object(paymentIntentSchema),
};
