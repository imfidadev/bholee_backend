const sendEmail = require("@services/mail");
const { apiResponse } = require("@utils");

exports.contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const options = {
      subject: "Contact Us",
      file_name: "contact_us",
      data: { name, email, message: message ?? "" },
    };

    //send email
    const result = await sendEmail(options);
    return result.hasOwnProperty("responseCode") && result.responseCode === 451
      ? apiResponse(req, res, {}, 451, result.response)
      : apiResponse(req, res, {}, 200, `Email sent successfully`);
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};

exports.booking = async (req, res) => {
  try {
    const {
      referralCode,
      email,
      firstName,
      lastName,
      companyName,
      phone,
      address,
      country,
      city,
      postalCode,
      paymentId,
      amount,
      description,
      plan_desc,
      plan_title,
      title,
      type,
    } = req.body;

    const options = {
      subject: "Booking",
      file_name: "booking",
      data: {
        referralCode: referralCode ?? "",
        email,
        firstName,
        lastName,
        companyName: companyName ?? "",
        phone,
        address,
        country,
        city,
        postalCode,
        paymentId,
        amount,
        description: description ?? "",
        plan_desc: plan_desc ?? "",
        plan_title: plan_title ?? "",
        title: title ?? "",
        type: type ?? "",
      },
    };

    //send email
    const result = await sendEmail(options);
    return result.hasOwnProperty("responseCode") && result.responseCode === 451
      ? apiResponse(req, res, {}, 451, result.response)
      : apiResponse(req, res, {}, 200, `Email sent successfully`);
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};
