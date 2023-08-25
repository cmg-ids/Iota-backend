const { failed, success } = require("../utils/Reply");
const ContactUs = require("../Models/ContactUs");
// const sendEmail = require("../utils/Mail");
const { uppercaseFirst } = require("../utils/AccessorsAndMutators");

// ? **************************************** Save the contact ************************************************ */
exports.save = async (req, res) => {
  try {
    req.body.first_name = uppercaseFirst(req.body.first_name);
    req.body.last_name =
      req.body.last_name === ""
        ? req.body.last_name
        : uppercaseFirst(req.body.last_name);
    const contactUs = new ContactUs(req.body);
    const save = await contactUs.save();
    if (save) {
      //   await sendEmail(
      //     req.body.email,
      //     "Glad to hear from you! We'll be in touch soon",
      //     "contact-us",
      //     {
      //       name: uppercaseFirst(req.body.first_name.replace(/^\s+|\s+$/gm, "")),
      //     }
      //   );
      return success(
        res,
        `We are glad you're considering us. Our business team will get back to you within 24 hrs.`
      );
    }

    throw new Error("Unable to send the message. Try again!");
  } catch (error) {
    failed(res, error.message);
  }
};

// ? **************************************** Show the contacts ************************************************ */
exports.show = async (req, res) => {
  try {
    const contacts = await ContactUs.show();
    if (contacts) {
      return success(res, "Here is the data", contacts[0]);
    }

    throw new Error("No contact found. Try again!");
  } catch (error) {
    failed(res, error.message);
  }
};

// ? **************************************** find the contact ************************************************ */
exports.find = async (req, res) => {
  try {
    const contacts = await ContactUs.findById(req.params.id);
    if (contacts) {
      return success(res, "Here is the data", contacts[0][0]);
    }

    throw new Error("No contact found. Try again!");
  } catch (error) {
    failed(res, error.message);
  }
};
