const Student = require("./models/Student");
const Instructor = require("./models/Instructor");
const Admin = require("./models/Admin");
const CryptoJS = require("crypto-js");
const express = require("express");

const secretKey = process.env.SECRET_KEY;

async function handleStudentlogin(req, res) {
  try {
    const cryptedBytes = CryptoJS.AES.encrypt(
      req.body.prnNo,
      secretKey
    ).toString();
    const student = await Student.findOne({
      prnNo: req.body.prnNo,
      password: req.body.password,
      regId: req.body.regId,
    });
    if (!student) {
      return res.status(404).json({ student: "NULL" });
    }
    return res.status(200).json({ student: cryptedBytes });
  } catch (error) {
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
  handleStudentlogin,
  handleInstructorlogin,
  handleAdminlogin,
};
