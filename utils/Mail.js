const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const expressMailerHbs = require("nodemailer-express-handlebars");
const viewPath = path.resolve(__dirname, "../templates/emails/");

const fromEmail = process.env.NODE_APP_MAIL_USER;

const transporter = nodemailer.createTransport({
  host: process.env.NODE_APP_MAIL_HOST,
  port: process.env.NODE_APP_MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.NODE_APP_MAIL_USER,
    pass: process.env.NODE_APP_MAIL_PASS,
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
