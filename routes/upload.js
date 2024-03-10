require("dotenv").config();

const express = require("express");
const app = express.Router();

const multer = require("multer");
const nodemailer = require("nodemailer");

const mime = require("mime-types");

const { allowedMimeType } = require("../utils/helper");

const { transporterConfig, mailOptions, routes } = require("../config/config");

const ACCEPT_FILE_SIZE = process.env.ACCEPT_FILE_SIZE;

// Storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads"); // folder ที่เราต้องการเก็บไฟล์
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // ให้ใช้ชื่อไฟล์ original เป็นชื่อหลังอัพโหลด
  },
});

// ตั้งค่า Multer สำหรับการเก็บไฟล์และการตรวจสอบ
const upload = multer({
  storage,
  limits: { fileSize: ACCEPT_FILE_SIZE }, // จำกัดขนาดไฟล์
});

// กำหนด Endpoint /upload สำหรับรับไฟล์
app.post(routes.UPLOAD, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileType = mime.lookup(req.file.path);

  // ตรวจสอบประเภทไฟล์
  const isAllowedFileType = allowedMimeType(fileType);
  if (!isAllowedFileType) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  // Configure nodemailer for sending email notifications
  const transporter = nodemailer.createTransport(transporterConfig);

  // Send email notification
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Email notification failed" });
    } else {
      console.log("Email notification sent: " + info.response);
      res.status(201).json({ message: "File uploaded successfully" });
    }
  });
});

module.exports = app;
