const { apiResponse } = require("@utils");
const axios = require("axios");
const config = require("@config");
const { access_token } = config.instagram;

exports.getInstagramPosts = async (req, res) => {
  try {
    const posts = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${access_token}&limit=8`
    );

    const data = posts?.data?.data ?? [];
    return apiResponse(req, res, data, 200, `successfully`);
  } catch (err) {
    return apiResponse(req, res, {}, 500, err.message);
  }
};
