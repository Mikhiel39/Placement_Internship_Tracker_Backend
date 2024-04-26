const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const Question = require("../models/Question");
const Instructor = require("../models/Instructor");
const Question_model = require("../models/Question_model");
const Token =require("../models/Token")
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

async function getInstructor(req, res) {
  const instructor = await Instructor.find().exec();
  if (!instructor)
    return res.status(404).json({ error: "No Instructor available" });
  return res.json(instructor);
}
async function getStudent(req, res) {
  const student = await Student.find().exec();
  if (!student) return res.status(404).json({ error: "No Student available" });
  return res.json(student);
}
async function getAdmin(req, res) {
  const admin = await Admin.find().exec();
  if (!admin) return res.status(404).json({ error: "No Admin available" });
  return res.json(admin);
}

async function getAdminbyadminemailId(req, res) {
  try {
    console.log(req.query.adminemailId);
    const adminemailId = await Token.findOne({
      encrypted: req.query.adminemailId,
    });
    if (!adminemailId) {
      return res.status(404).json({ error: adminemailId });
    }
    const admin = await Admin.findOne({
      adminemailId: adminemailId.user,
    }).exec();

    if (!admin) {
      return res.status(404).json({ error: "No Such Admin available" });
    }

    return res.json(admin);
  } catch (error) {
    console.error("Error fetching instructor by email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getInstructorByEmailID(req, res) {
  try {
    const instructor = await Instructor.find({
      instructoremailId: req.query.instructoremailId,
    }).exec();

    if (!instructor) {
      return res.status(404).json({ error: "No Such Instructor available" });
    }

    return res.json(instructor);
  } catch (error) {
    console.error("Error fetching instructor by email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getStudentByprnno(req, res) {
  const student = await Student.findOne({
    prnNo: req.query.prnNo,
  }).exec();
  if (!student)
    return res.status(404).json({ error: "No Such Student available" });
  return res.json(student);
}


async function getStudentByInstructor(req, res) {
  const student = await Student.find({
    instructoremailId: req.params.instructoremailId,
    prnNo: req.params.prnNo,
  }).exec();
  if (!student)
    return res.status(404).json({ error: "No Such Student available" });
  return res.json(student);
}

async function getInternshipByprnno(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.prnNo,
    });
    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" });
    }
    const internship = await Internship.findOne({
      prnNo: prnNo.user,
    }).exec();
    return res.json(internship);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


async function getInternshipByInstructor(req, res) {
  try {
    const student = await Student.findOne({
      instructoremailId: req.query.instructoremailId,
      prnNo: req.query.prnNo,
    }).exec();

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student.internshipStatus !== "Yes") {
      return res.json({ message: "Student is not enrolled in an internship" });
    }

    const internships = await Internship.find({
      prnNo: req.query.prnNo,
    }).exec();

    if (internships.length === 0) {
      return res
        .status(404)
        .json({ error: "No internship available for the student" });
    }

    return res.json(internships);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getPlacementByInstructor(req, res) {
  try {
    const student = await Student.findOne({
      instructoremailId: req.query.instructoremailId,
      prnNo: req.query.prnNo,
    }).exec();

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student.placementStatus !== "Yes") {
      return res
        .status(404)
        .json({ error: "Placement not available for this student" });
    }

    const placement = await Placement.find({ prnNo: req.query.prnNo }).exec();

    if (placement.length === 0) {
      return res
        .status(404)
        .json({ error: "No placement available for this student" });
    }

    return res.json(placement);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getPlacementByprnno(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.prnNo,
    });
    if (!prnNo) {
      return res.status(404).json({ error: "Not yet Login" });
    }
    const student = await Student.findOne({ prnNo: prnNo.user }).exec();
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student.placementStatus === "Yes") {
      const placement = await Placement.findOne({
        prnNo: prnNo.user,
      }).exec();
      if (!placement) {
        return res.status(404).json({ error: "No placement available" });
      }
      return res.json(placement);
    } else {
      return res.json({ message: "Placement status is not Yes" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getQuestionByInstructor(req, res) {
  const student = await Student.find({
    instructoremailId: req.query.instructoremailId,
    prnNo: req.query.prnNo,
  }).exec();
  const question = await Question_model.find({
    prnNo: student.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function getQuestionByInstructoropen(req, res) {
  const student = await Student.find({
    instructoremailId: req.query.instructoremailId,
    prnNo: req.query.prnNo,
  }).exec();
  const question = await Question.find({
    prnNo: student.prnNo,
    Question_no: req.query.Question_no,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function getQuestionByprnno(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const question = await Question_model.find({
    prnNo: prnNo.user,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function addInternship(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.prnNo,
    });
    if (!prnNo) {
      return res.status(404).json({ error: "Not yet Login" });
    }
    const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

    // Check if imgUrl is present in the request
    if (!imgUrl) {
      return res.status(400).json({ error: "Offer letter URL is missing" });
    }
    const body = req.body;
    const p = prnNo.user; // Corrected to access prnNo from query parameters

    const internship = await Internship.findOne({
      prnNo: p, // Corrected to use the prnNo variable
      noInternship: req.body.noInternship,
    });
    if (!internship) {
      // Add validation for required fields here
      const result = await Internship.create({
        prnNo: prnNo, // Corrected to use the prnNo variable
        noInternship: req.body.noInternship,
        internshipDescription: body.internshipDescription,
        duration: body.duration,
        location: body.location,
        offerLetter: imgUrl,
        stipend: body.stipend,
        companyname: body.companyname,
        internTitle: body.internTitle,
        domain: body.domain,
        externalInstructors: body.externalInstructors,
      });

      await Student.findOneAndUpdate(
        { prnNo: p }, // Corrected to use the prnNo variable
        { internshipStatus: "Yes" }
      );

      return res.status(200).json({ msg: "Internship added successfully" });
    } else {
      await Internship.findOneAndUpdate(
        { prnNo: prnNo, noInternship: req.body.noInternship }, // Corrected to use the prnNo variable
        {
          internshipDescription: body.internshipDescription,
          duration: body.duration,
          location: body.location,
          stipend: body.stipend,
          offerLetter: imgUrl,
          internTitle: body.internTitle,
          domain: body.domain,
          externalInstructors: body.externalInstructors,
        }
      );

      return res.status(200).json({ msg: "Internship updated successfully" });
    }
  } catch (error) {
    console.error("Error adding/updating internship:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function addPlacement(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.prnNo,
    });
    if (!prnNo) {
      return res.status(404).json({ error: "Not yet Login" });
    }
    const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

    // Check if imgUrl is present in the request
    if (!imgUrl) {
      return res.status(400).json({ error: "Offer Letter URL is missing" });
    }
    const body = req.body;
    const placement = await Placement.findOne({
      companyname: body.companyname,
      prnNo: prnNo.user,
    });
    if (!placement) {
      if (
        !body.role ||
        !body.jobDescription ||
        !body.location ||
        !body.salary ||
        !body.companyname ||
        !body.domain
      ) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const result = await Placement.create({
        prnNo: prnNo.user,
        role: body.role,
        jobDescription: body.jobDescription, // Fix typo
        location: body.location,
        offerLetter: imgUrl,
        companyname: body.companyname,
        salary: body.salary,
        domain: body.domain,
      });

      await Student.findOneAndUpdate(
        { prnNo: prnNo.user },
        { placementStatus: "Yes" }
      );
    } else {
      await Placement.findOneAndUpdate(
        { companyname: body.companyname, prnNo: prnNo.user },
        {
          role: body.role,
          jobDescription: body.jobDescription,
          offerLetter: imgUrl,
          location: body.location,
          salary: body.salary,
          domain: body.domain,
        }
      );
    }

    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}
async function addStudent(req, res) {
  try {
    const prn = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!prn) {
      return res.status(404).json({ error: "Not yet logged in" }); // Corrected typo in the error message
    }


    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Assuming your CSV file has columns 'companyname', 'numberOfStudentsPlaced', 'avgPackage', etc.
        // Adjust the keys according to your CSV structure
        const studentData = {
          regId: data.regId,
          name: data.name,
          prnNo: data.prnNo,
          password: data.password,
          instructoremailId: data.instructoremailId,
          // Add more fields as necessary
        };
        results.push(studentData);
      })
      .on("end", () => {
        // Now 'results' array contains objects with data from CSV file
        // You can save this data into your Company model
        Student.insertMany(results)
          .then((docs) => {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            return res
              .status(200)
              .json({ message: "CSV uploaded successfully" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function addAdmin(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" }); // Corrected typo in the error message
    }

    // const imgUrl = req.getCsv; // Assuming req.getCsv contains the path to the CSV file

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Assuming your CSV file has columns 'companyname', 'numberOfStudentsPlaced', 'avgPackage', etc.
        // Adjust the keys according to your CSV structure
        // console.log(data.name.trim());
        const adminData = {
          name: data.name,
          adminemailId: data.adminemailId,
          department: data.department,
          password: data.password,
          // Add more fields as necessary
        };
        results.push(adminData);
      })
      .on("end", () => {
        // Now 'results' array contains objects with data from CSV file
        // You can save this data into your Company model
        Admin.insertMany(results)
          .then((docs) => {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            return res
              .status(200)
              .json({ message: "CSV uploaded successfully" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
async function addInstructor(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" }); // Corrected typo in the error message
    }

    // const imgUrl = req.getCsv; // Assuming req.getCsv contains the path to the CSV file

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Assuming your CSV file has columns 'companyname', 'numberOfStudentsPlaced', 'avgPackage', etc.
        // Adjust the keys according to your CSV structure
        const instructorData = {
          name: data.name,
          instructoremailId: data.instructoremailId,
          password: data.password,
          students: { prnNo: data.students_prnNo, name: data.students_name },
          // Add more fields as necessary
        };
        results.push(instructorData);
      })
      .on("end", () => {
        // Now 'results' array contains objects with data from CSV file
        // You can save this data into your Company model
        Instructor.insertMany(results)
          .then((docs) => {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            return res
              .status(200)
              .json({ message: "CSV uploaded successfully" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function updateCompletionLetterInternship(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Completion letter URL is missing" });
  }
  try {
    await Internship.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        completionLetter: imgUrl,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// async function updateOfferLetterInternship(req, res) {
//   const body = req.body;
//   try {
//     const internship = Internship.findOne({ prnNo: req.params.prnNo });
//     if (internship) {
//       await Internship.findOneAndUpdate(
//         { prnNo: req.params.prnNo },
//         {
//           offerLetter: body.offerLetter,
//         }
//       );
//     }
//     return res.status(201).json({ msg: "success" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }
// async function updateOfferLetterPlacement(req, res) {
//   const body = req.body;
//   try {
//     const placement = Placement.findOne({ prnNo: req.params.prnNo });
//     if (placement) {
//       await Placement.findOneAndUpdate(
//         { prnNo: req.params.prnNo },
//         {
//           offerLetter: body.offerLetter,
//         }
//       );
//     }
//     return res.status(201).json({ msg: "success" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }
async function deleteInstructor(req, res) {
  try {
    const instructor = await Instructor.findOne({
      instructoremailId: req.query.instructoremailId,
    });
    if (instructor) {
      await Instructor.findOneAndDelete({
        instructoremailId: req.query.instructoremailId,
      });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteAdmin(req, res) {
  try {
    const admin = await Admin.findOne({
      adminemailId: req.query.emailId,
    });
    if (admin) {
      await Admin.findOneAndDelete({
        adminemailId: req.query.emailId,
      });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteAllStudent(req, res) {
  try {
    // Delete all students and related information
    await Student.deleteMany();
    await Internship.deleteMany({}); // Delete all internships
    await Placement.deleteMany({}); // Delete all placements
    await Question.deleteMany({}); // Delete all questions

    // Update all instructors' student lists
    const instructors = await Instructor.find();
    for (const instructor of instructors) {
      instructor.students = []; // Remove all students from instructor's list
      await instructor.save();
    }

    // Respond with success message
    return res
      .status(200)
      .json({ msg: "All student data deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

// deleteAllStudent

async function deleteStudent(req, res) {
  try {
    // Find the student based on the student's PRN number
    const student = await Student.findOne({ prnNo: req.query.prnNo });

    // If student exists, proceed with deletion
    if (student) {
      const emailId = student.instructoremailId;

      // Delete student and related information
      await Student.findOneAndDelete({ prnNo: req.query.prnNo });
      await Internship.findOneAndDelete({ prnNo: req.query.prnNo });
      await Placement.findOneAndDelete({ prnNo: req.query.prnNo });
      await Question.findOneAndDelete({ prnNo: req.query.prnNo });

      // Check if instructor exists based on the instructor's email
      const instructors = await Instructor.find({
        instructoremailId: emailId,
      });

      // If instructor exists, update their list of students
      for (const instructor of instructors) {
        instructor.students = []; // Remove all students from instructor's list
        await instructor.save();
      }
    }

    // Respond with success message
    return res.status(200).json({ msg: "Student deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
  // upload,
  getInstructor,
  getStudent,
  getAdmin,
  addInstructor,
  addStudent,
  addAdmin,
  addInternship,
  addPlacement,
  getStudentByInstructor,
  getInstructorByEmailID,
  getAdminbyadminemailId,
  getStudentByprnno,
  getInternshipByInstructor,
  getInternshipByprnno,
  getPlacementByprnno,
  getPlacementByInstructor,
  getQuestionByprnno,
  getQuestionByInstructor,
  getQuestionByInstructoropen,
  updateCompletionLetterInternship,
  deleteAdmin,
  deleteInstructor,
  deleteStudent,
  deleteAllStudent,
};
