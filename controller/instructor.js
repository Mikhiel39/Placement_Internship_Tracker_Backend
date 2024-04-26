const Student = require("../models/Student");
const Instructor = require("../models/Instructor");
const mongoose = require("mongoose");
const TnpCordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Notification = require("../models/Notification");
const Token =require("../models/Token");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Save uploaded files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to file name to avoid conflicts
  },
});

const upload = multer({ storage: storage });


async function addBatch(req, res) {
  try {
    if (!req.query.instructoremailId) {
      return res.status(400).json({ error: "instructoremailId is missing" });
    }

    // Attempt to find Token with the provided prnNo
    const token = await Token.findOne({
      encrypted: req.query.instructoremailId,
    });

    // If Token is not found, return 404 error
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    const { instructoremailId } = req.query;
    const { prnNo, name } = req.body;

    // Find the instructor by email
    const instructor = await Instructor.find({
      instructoremailId: instructoremailId,
    });

    // Check if the instructor exists
    if (!instructor) {
      return res.status(404).json({ msg: "Instructor not found" });
    }

    // Get the first student record from the instructor's students array
    const studentRecord = instructor[0]; // Assuming you want the first record

    // Create a new student object
    const newStudent = {
      instructoremailId,
      students: [
        {
          prnNo,
          name,
        },
      ],
      instructorName: studentRecord.name,
      instructorPassword: studentRecord.password,
    };

    // Save the new student
    const savedStudent = await Instructor.create(newStudent);

    return res.status(201).json({ msg: "Success", student: savedStudent });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}


async function deleteBatch(req, res) {
  try {
    if (!req.query.instructoremailId) {
      return res.status(400).json({ error: "instructoremailId is missing" });
    }

    // Attempt to find Token with the provided prnNo
    const token = await Token.findOne({
      encrypted: req.query.instructoremailId,
    });

    // If Token is not found, return 404 error
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }
     const instructors = await Instructor.find({
       instructoremailId,
     });

    for (const instructor of instructors) {
      instructor.students = []; // Remove all students from instructor's list
      await instructor.save();
    }
    return res.status(201).json({
      success: true,
      message: "Student removed from batch successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

async function updatebgimage(req, res) {
  // Check if prnNo is present in the request query
  if (!req.query.instructoremailId) {
    return res
      .status(400)
      .json({ error: "instructoremailId is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.instructoremailId });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is missing" });
  }
  await Instructor.findOneAndUpdate(
    { instructoremailId: token.user },
    { bgimage: imgUrl }
  );

  // Return success message
  return res
    .status(200)
    .json({ message: "Background image updated successfully" });
}

async function getInstructorByEmailID(req, res) {
  try {
    const instructoremail = await Token.findOne({
      encrypted: req.query.instructoremailId,
    });
    if (!instructoremail) {
      return res.status(404).json({ error: "Not yet logged in" });
    }
    const instructor = await Instructor.find({
      instructoremailId: instructoremail.user,
    }).exec();

    if (!instructor) {
      return res.status(404).json({ error: "No Such Instructor available" });
    }

    return res.json({ instructor});
  } catch (error) {
    console.error("Error fetching instructor by email:", error);
    return res.status(500).json({ error: error });
  }
}

async function updateimage(req, res) {
  if (!req.query.instructoremailId) {
    return res.status(400).json({ error: "instructoremailId is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.instructoremailId });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is missing" });
  }
  await Instructor.findOneAndUpdate(
    { instructoremailId: token.user },
    { image: imgUrl }
  );

  // Return success message
  return res.status(200).json({ message: "Image updated successfully" });
}

module.exports = {
  getInstructorByEmailID,
  addBatch,
  updatebgimage,
  updateimage,
  deleteBatch,
};
