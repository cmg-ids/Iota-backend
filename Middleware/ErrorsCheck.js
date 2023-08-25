const { validationResult } = require("express-validator");
const { failed } = require("../utils/Reply");

const errorsCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return failed(res, errors.array()[0].msg);
  }

  return next();
};

module.exports = errorsCheck;
