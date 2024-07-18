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

const metadata = {
  referralCode: Joi.string().label("Referral Code").allow(null, ""),
  email: Joi.string().label("Email").required(),
  firstName: Joi.string().label("First Name").required(),
  lastName: Joi.string().label("Last Name").required(),
  companyName: Joi.string().allow(null, ""),
  phone: Joi.string().label("phone").required(),
  address: Joi.string().label("Address").required(),
  country: Joi.string().label("Country").required(),
  city: Joi.string().label("City").required(),
  postalCode: Joi.string().label("Postal Code").required(),
  amount: Joi.number().label("Amount").required(),
  description: Joi.string().label("Description").allow(null, ""),
  plan_desc: Joi.string().label("Plan Description").allow(null, ""),
  plan_title: Joi.string().label("Plan Title").allow(null, ""),
  title: Joi.string().label("Title").allow(null, ""),
  type: Joi.string().label("Type").allow(null, ""),
};

const bookingSchema = {
  ...metadata,
  paymentId: Joi.string().label("Payment Id").required(),
};

const paymentIntentSchema = {
  currency: Joi.string().label("Currency").required(),
  amount: Joi.number().integer().label("Amount").required(),
  receipt_email: Joi.string().label("Receipt Email").required(),
  metadata: Joi.object({
    ...metadata,
  }),
};

module.exports = {
  validate,
  contactUsSchema: Joi.object(contactUsSchema),
  bookingSchema: Joi.object(bookingSchema),
  paymentIntentSchema: Joi.object(paymentIntentSchema),
};
