const { body } = require("express-validator");

// ? ******************************** Contact Us ******************************** */
exports.contactUsValidations = [
  body("first_name").not().isEmpty().withMessage("First name cannot be empty!"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty!")
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter the valid e-mail!"),
  body("checkField")
    .isEmpty()
    .withMessage("There is an error for submitting a form. Try again!"),
];
