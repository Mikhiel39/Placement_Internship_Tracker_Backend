const Student = require("./models/Student");
const Instructor = require("./models/Instructor");
const Admin = require("./models/Admin");
const CryptoJS = require("crypto-js");
const Token = require("./models/Token");
const express = require("express");

const secretKey = process.env.SECRET_KEY;

// async function handleStudentLogin(req, res) {
//   const prnNo = req.body.prnNo; 
//   // const secretKey = secretKey ;

//   try {
//     const student = await Student.findOne({ prnNo }); // Find student by prnNo
//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     const encryptedData = CryptoJS.AES.encrypt(
//       JSON.stringify({ prnNo }),
//       secretKey
//     ).toString();
//     // Decode the base64 string
//     const decodedString = Buffer.from(encryptedData, "base64").toString(
//       "utf-8"
//     );

//     // URL decode the string
//     const urlDecodedString = decodeURIComponent(decodedString);

//     // Remove the '+' character
//     const stringWithoutPlus = urlDecodedString.replace(/\+/g,"");

//     // Encode the modified string back to base64
//     const modifiedBase64String = Buffer.from(
//       stringWithoutPlus,
//       "utf-8"
//     ).toString("base64");

//     const encryptedDataWithQuotes = '"' + modifiedBase64String + '"'; // Include double quotes around encryptedData

//     const token = new Token({
//       encrypted: encryptedDataWithQuotes,
//       user: prnNo,
//     });
//     await token.save(); // Save the token to the database

//     return res.status(200).send(modifiedBase64String);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// Import CryptoJS library

async function handleStudentLogin(req, res) {
  const prnNo = req.body.prnNo;

  try {
    const student = await Student.findOne({ prnNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Generate random token string
    const randomToken = Math.random().toString(36).substring(2);
    const encryptedDataWithQuotes = '"' + randomToken + '"';

    // Encrypt student data using AES encryption

    // Save encrypted data to database
    const token = new Token({
      encrypted: encryptedDataWithQuotes,
      user: prnNo,
    });
    await token.save();

    // Send the token to the client
    return res.status(200).send(randomToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function handleInstructorlogin(req, res) {
  const instructoremailId = req.body.instructoremailId;
  try {
    const instructor = await Instructor.findOne({
      instructoremailId: instructoremailId,
    });
    const randomToken = Math.random().toString(36).substring(2);
    const encryptedDataWithQuotes = '"' + randomToken + '"';
     const token = new Token({
       encrypted:encryptedDataWithQuotes,
       user:instructoremailId,
     });
     await token.save();
    if (!instructor) {
      return res.status(404).json({ instructor: "null" });
    }
    return res.status(200).send(randomToken);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function handleAdminlogin(req, res) {
  const adminemailId = req.body.adminemailId;
   console.log(adminemailId);
  try {
    const admin = await Admin.findOne({
      adminemailId,
    });
    console.log(admin)
    if (!admin) {
      return res.status(200).json({ admin: "null" });
    }
    const randomToken = Math.random().toString(36).substring(2);
    const encryptedDataWithQuotes = '"' + randomToken + '"';
    // const adminemailIdWithQuotes = '"' + adminemailId + '"';
    const token = new Token({
      encrypted: encryptedDataWithQuotes,
      user: adminemailId,
    });
    await token.save();
    return res.status(200).send(randomToken);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  handleStudentLogin,
  handleInstructorlogin,
  handleAdminlogin,
};
