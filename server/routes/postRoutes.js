const express = require("express");
const router = express.Router();
const controller = require("@controllers/postController");

router.route("/posts").get(controller.getInstagramPosts);

module.exports = router;
