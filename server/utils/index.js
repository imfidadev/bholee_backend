const config = require("@config");

const apiResponse = (req, res, data, code, message) => {
  if (req == undefined) throw Error("req is required");
  if (res == undefined) throw Error("res is required");
  if (data == undefined) throw Error("data is required");
  if (code == undefined) throw Error("code is required");
  if (message == undefined) throw Error("message is required");

  let path = req.path;
  if (!path.includes("api")) path = `/${config.apiPrefix}${req.path}`;
  const action = path.replace("/", "");

  var data = {
    action,
    meta: {
      code,
      message,
    },
    data,
  };

  return res.status(200).json(data);
};

module.exports = {
  apiResponse,
};
