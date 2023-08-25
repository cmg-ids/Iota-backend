const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const expressMailerHbs = require("nodemailer-express-handlebars");
const viewPath = path.resolve(__dirname, "../templates/emails/");

const fromEmail = "no-reply@idsil.com";

const transporter = nodemailer.createTransport({
  host: "192.168.10.59",
  port: 25,
  secure: false,
  auth: {
    user: "no-reply@idsil.com",
    pass: "Login@123",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.use(
  "compile",
  expressMailerHbs({
    viewEngine: {
      extName: ".hbs",
      defaultLayout: false,
      express,
    },
    viewPath: viewPath,
    extName: ".hbs",
  })
);

const sendEmail = async (to, subject, template, data = {}, isBCC = true) => {
  return await transporter.sendMail({
    from: {
      address: fromEmail,
      name: "IDS Infotech Ltd.",
    },
    to: to,
    // cc: isCC ? process.env.NODE_APP_MAIL_CC : "",
    bcc: isBCC ? "nitish.bhogal@idsil.com" : "",
    subject: subject,
    template: template,
    context: data,
  });
};

module.exports = sendEmail;
