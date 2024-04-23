const Student = require("./models/Student");
const Instructor = require("./models/Instructor");
const Admin = require("./models/Admin");
const CryptoJS = require("crypto-js");
const Token = require("./models/Token");
const express = require("express");

const secretKey = process.env.SECRET_KEY;

const CryptoJS = require("crypto-js"); // Import CryptoJS library
const Student = require("path/to/your/StudentModel"); // Import Student model
const Token = require("path/to/your/TokenModel"); // Import Token model

async function handleStudentLogin(req, res) {
  const prnNo = req.body.prnNo; // Destructure prnNo from req.body
  const secretKey = "your_secret_key"; // Define your secret key

  try {
    const student = await Student.findOne({ prnNo }); // Find student by prnNo
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify({ prnNo }),
      secretKey
    ).toString();

    const encryptedDataWithQuotes = '"' + encryptedData + '"'; // Include double quotes around encryptedData

    const token = new Token({
      encrypted: encryptedDataWithQuotes,
      user: prnNo,
    });
    await token.save(); // Save the token to the database

    return res.status(200).send(encryptedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function handleInstructorlogin(req, res) {
  const instructoremailId = req.body.instructoremailId;
  try {
    const cryptedBytes = CryptoJS.AES.encrypt(
      instructoremailId,
      secretKey
    ).toString();
    // const decryptedPrn = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const instructor = await Instructor.findOne({
      instructoremailId: instructoremailId,
    });
     const token = new Token({
       encrypted: cryptedBytes,
       user: instructoremailId,
     });
     await token.save();
    if (!instructor) {
      return res.status(404).json({ instructor: "NULL" });
    }
    return res.status(200).send(cryptedBytes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleAdminlogin(req, res) {
  const adminemailId = req.body.adminemailId;
  try {
    const cryptedBytes = CryptoJS.AES.encrypt(
      adminemailId,
      secretKey
    ).toString();
    const admin = await Admin.findOne({
      adminemailId: adminemailId,
    });
    const token = new Token({
      encrypted: cryptedBytes,
      user: adminemailId,
    });
    await token.save();
    if (!admin) {
      return res.status(200).json({ admin: "NULL" });
    }
    return res.status(200).send(cryptedBytes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  handleStudentLogin,
  handleInstructorlogin,
  handleAdminlogin,
};
