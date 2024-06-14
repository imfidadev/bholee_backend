const sendEmail = require("@services/mail");
const { apiResponse } = require("@utils");

exports.contactUs = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const options = {
      subject: "Contact Us",
      file_name: "contact_us",
      data: {
        name,
        phone,
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

exports.booking = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      companyName,
      phone,
      address,
      city,
      postalCode,
    } = req.body;

    const options = {
      subject: "Booking",
      file_name: "booking",
      data: {
        email,
        firstName,
        lastName,
        companyName: companyName ?? "",
        phone,
        address,
        city,
        postalCode,
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
