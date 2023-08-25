const { apiKeyName } = require("../utils/AccessorsAndMutators");
const { failed } = require("../utils/Reply");

// ? ********************************* API Check ******************************** */
const apiCheck = (req, res, next) => {
  const keyName = apiKeyName(req.baseUrl);
  if (req.header("x-api-key") === keyName) {
    return next();
  }

  return failed(res, "Invalid api key. Try again!");
};

module.exports = apiCheck;
