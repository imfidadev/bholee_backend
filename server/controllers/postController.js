const { apiResponse } = require("@utils");
const axios = require("axios");
const config = require("@config");
const { access_token, username } = config.instagram;

exports.getInstagramPosts = async (req, res) => {
  try {
    const userId = await axios.get(
      `https://graph.instagram.com/v12.0/${username}?fields=id&access_token=${access_token}`
    );

    const result = await axios.get(
      `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${access_token}&count=10`
    );

    return apiResponse(req, res, {}, 200, `successfully`);
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};
