require("dotenv").config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_TO = process.env.EMAIL_TO;

// Nodemailer configuration
const transporterConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
};

// Email notification content
const mailOptions = {
  from: EMAIL_FROM,
  to: EMAIL_TO,
  subject: "File Uploaded Successfully",
  text: "Your file has been uploaded successfully.",
};

const routes = {
  UPLOAD: "/upload",
};

module.exports = { transporterConfig, mailOptions, routes };
