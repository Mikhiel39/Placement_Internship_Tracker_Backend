const Student = require("./models/Student");
const Instructor = require("./models/Instructor");
const Admin = require("./models/Admin");
const CryptoJS = require("crypto-js");
const express = require("express");

const secretKey = process.env.SECRET_KEY;

async function handleStudentLogin(req, res) {
  const prnNo=req.query.prnNo; // Destructure prnNo, password, and regId from req.body
  try {
    const student = await Student.findOne({ prnNo }); // Find student by prnNo, password, and regId
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Encrypt student data
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify({ prnNo }),
      secretKey
    ).toString();
    const encryptedBase64Data = Buffer.from(encryptedData).toString("base64");

    return res.status(200).json({ student: encryptedBase64Data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleInstructorlogin(req, res) {
  try {
    const cryptedBytes = CryptoJS.AES.encrypt(
      req.body.instructoremailId,
      secretKey
    ).toString();
    // const decryptedPrn = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const instructor = await Instructor.findOne({
      instructoremailId: req.body.instructoremailId,
      password: req.body.password,
    });
    if (!instructor) {
      return res.status(404).json({ instructor: "NULL" });
    }
    return res.status(200).json({ instructor: cryptedBytes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleAdminlogin(req, res) {
  try {
    const cryptedBytes = CryptoJS.AES.encrypt(
      req.body.adminemailId,
      secretKey
    ).toString();
    // const decryptedPrn = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const admin = await Admin.findOne({
      adminemailId: req.body.adminemailId,
      password: req.body.password,
    });
    if (!admin) {
      return res.status(200).json({ admin: "NULL" });
    }
    return res.status(200).json({ admin: cryptedBytes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  handleStudentLogin,
  handleInstructorlogin,
  handleAdminlogin,
};
