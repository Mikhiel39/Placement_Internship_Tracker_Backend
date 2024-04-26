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
    if (req.query.prnNo != body.prnNo) {
      return res.status(404).json({ msg: "prnNo does not match" });
    }
    const { prnNo, instructoremailId } = req.query;
    const { students } = req.body;

    // Find the instructor by email
    const instructor = await Instructor.findOne({ instructoremailId });

    // Check if the instructor exists
    if (!instructor) {
      return res.status(404).json({ msg: "Instructor not found" });
    }

    // Check if all required fields are provided for each student
    if (students.some((student) => !student.firstname || !student.lastname)) {
      return res
        .status(400)
        .json({ msg: "All fields are required for each student" });
    }

    // Ensure each student object has a unique _id field
    const formattedStudents = students.map((student) => ({
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
      ...student,
    }));

    // Find each student by prnNo and update their instructoremailId
    const updatedStudents = await Promise.all(
      formattedStudents.map(async (studentData) => {
        const updatedStudent = await Student.findOneAndUpdate(
          { prnNo: studentData.prnNo },
          { instructoremailId },
          { new: true } // Return the updated document
        );

        // If student not found, return 404
        if (!updatedStudent) {
          throw new Error(`Student with PRN ${studentData.prnNo} not found`);
        }

        return updatedStudent;
      })
    );

    // Add students to instructor's list of students
    instructor.students.push(...updatedStudents);
    await instructor.save(); // Save changes to the instructor

    return res.status(201).json({ msg: "Success", students: updatedStudents });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}

async function deleteBatch(req, res) {
  try {
    // console.log("Instructor email:", req.params.instructoremailId);
    // console.log("Student PRN:", req.params.prnNo);

    const result = await Instructor.updateOne(
      { instructoremailId: req.query.instructoremailId },
      { $pull: { students: { prnNo: req.query.prnNo } } }
    );

    // console.log("Update result:", result);

    // Update the student's instructor email to null
    await Student.findOneAndUpdate(
      { prnNo: req.query.prnNo },
      { instructoremailId: null }
    );

    return res.status(201).json({
      success: true,
      message: "Student removed from batch successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

// async function updatebgimage(req, res) {
//   try {
//     let img = null; // Changed const to let
//     // await upload.single("bgimage")(req, res); // Moved multer middleware here to properly handle the file upload

//     // Access the uploaded file path from req.file
//     if (req.file) {
//       img = req.file.path;
//     } else {
//       throw new Error("No bgimage uploaded");
//     }
//     await Instructor.findOneAndUpdate(
//       { instructoremailId: req.query.instructoremailId },
//       {
//         bgimage: img,
//       }
//     );
//     return res.status(201).json({ msg: "success" });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }

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
  try {
    let img = null; // Changed const to let
    // await upload.single("image")(req, res); // Moved multer middleware here to properly handle the file upload

    // Access the uploaded file path from req.file
    if (req.file) {
      img = req.file.path;
    } else {
      throw new Error("No image uploaded");
    }
    await Instructor.findOneAndUpdate(
      { instructoremailId: req.query.instructoremailId },
      {
        image: img,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  getInstructorByEmailID,
  addBatch,
  // updatebgimage,
  updateimage,
  deleteBatch,
};
