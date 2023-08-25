const bcrypt = require("bcryptjs");

// ? *************************** Encrypt the values ************************ */

exports.hashMake = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedValue = bcrypt.hashSync(value, salt);
  return hashedValue;
};

// ? *************************** Compare the encrypt values ************************ */

exports.compareHash = (currentPassword, oldPassword) => {
  const isSame = bcrypt.compareSync(currentPassword, oldPassword);
  if (!isSame) {
    return false;
  }
  return true;
};

// ? ************************ Api keys name *********************** */
exports.apiKeyName = (value) => {
  const baseUrl = value.replace("/api/", "");
  switch (baseUrl) {
    case "contacts":
      return process.env.NODE_APP_API_KEY_CONTACT_US;
    default:
      return process.env.NODE_APP_API_KEY_USER;
  }
};

// ? ************************* Uppercase first letter ********************** */
exports.uppercaseFirst = (value) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;
};

// ? ************************ uppercase all the first letters *********************** */
exports.uppercaseWords = (value) => {
  let splitValue = value.toLowerCase().split(" ");
  for (var i = 0; i < splitValue.length; i++) {
    splitValue[i] = `${splitValue[i].charAt(0).toUpperCase()}${splitValue[
      i
    ].substring(1)}`;
  }
  return splitValue.join(" ");
};

// ? ************************ Generate Random numbers *********************** */
exports.randNumber = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

// ? ************************ Create created At date *********************** */
exports.createdAt = () => {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
};

// ? ************************ Create updated At date *********************** */
exports.updatedAt = () => {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
};

// ? ************************ Subscriber subject and template *********************** */
exports.subscriberEmailData = (value) => {
  switch (value.toLowerCase()) {
    case "notification":
      return {
        subject: "Subscription Confirmed for IDS Talent Network",
        template: "notification",
      };
    // case "newsletter":
    //   return {
    //     subject: "Subscription Confirmed for IDS Talent Network",
    //     template: "newsletter",
    //   };
    default:
      return {
        subject: "Your subscription is confirmed!",
        template: "subscribe",
      };
  }
};
