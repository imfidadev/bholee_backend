const { apiResponse } = require("@utils");
const axios = require("axios");

exports.getInstagramPosts = async (req, res) => {
  try {
    const token = "1234567890123456789012345678901234567890";
    const userId = 1470414259;

    const result = await axios.get(
      `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${token}&count=10`
    );

    return result.hasOwnProperty("responseCode") && result.responseCode === 451
      ? apiResponse(req, res, {}, 451, result.response)
      : apiResponse(req, res, {}, 200, `Email sent successfully`);
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};
