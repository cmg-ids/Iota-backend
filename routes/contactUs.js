const express = require("express");
const { contactUsValidations } = require("../Middleware/Validations");
const apiCheck = require("../Middleware/ApiCheck");
const errorsCheck = require("../Middleware/ErrorsCheck");
const { save, show, find } = require("../Controller/ContactUsController");
const router = express.Router();

// ? *********************************** Save contact ******************************** */
router.post("/", apiCheck, contactUsValidations, errorsCheck, save);

// ? *********************************** Show contacts ******************************** */
router.get("/", apiCheck, show);

// ? *********************************** find contact ******************************** */
router.get("/:id", apiCheck, find);

exports.routes = router;
