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
const stream = require("stream"); // Added
const GoogleDriveService = require("../utils/googleDriveServices");

const storage = multer.memoryStorage();
const up = multer({ storage: storage });


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
    // console.log(req.query.adminemailId);
    const adminToken = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!adminToken) {
      return res.status(404).json({ error: "Admin Token not found" });
    }
    const admin = await Admin.findOne({ adminemailId: adminToken.user });
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ error: "No such admin found" });
    }

    return res.json(admin);
  } catch (error) {
    console.error("Error fetching admin by email:", error);
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
    const internship = await Internship.find({
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
    const imgUrl = req.body.imgURI; // Assuming you have imgUrl available in the request

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
    const imgUrl = req.body.imgURI; // Assuming you have imgUrl available in the request

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


    const file = req.file;

    if (!file || !file.buffer) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file stream missing" });
    }

    // Initialize GoogleDriveService
    const googleDriveService = new GoogleDriveService(
      process.env.GOOGLE_DRIVE_CLIENT_ID || "",
      process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
      process.env.GOOGLE_DRIVE_REDIRECT_URI || "",
      process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ""
    );

    // Upload CSV file to Google Drive
    const folderId = "1MWEXWJveK16lnokufh-J8NWdK7yaNvic"; // Specify the folder ID where you want to upload the CSV file
    const fileBuffer = req.file.buffer;
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer); // Get file buffer from req.file
    // Upload CSV file to Google Drive
    const fileMetadata = await googleDriveService.saveFile(
      req.file.originalname,
      bufferStream, // Pass file buffer directly
      "text/csv",
      folderId
    );

    // Retrieve file content from Google Drive
    const csvContent = await googleDriveService.getFileContent(fileMetadata.id);

    // Parse CSV content
    const results = [];
    csvContent.split("\n").forEach((line, index) => {
      if (index === 0) return; // Skip header row
      const [SrNo,regId,name,prnNo,password] = line.split(",");
      const sanitizedpassword = password.replace(/\r/g, ""); // Remove carriage return character
      results.push({
        SrNo,
        regId,
        name,
        prnNo,
        password: sanitizedpassword,
      });
    });

    // Insert data into MongoDB
    await Student.insertMany(results);

    return res
      .status(200)
      .json({ message: "CSV uploaded and admin data stored successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

async function addAdmin(req, res) {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" });
    }

    const  file  = req.file;

    if (!file || !file.buffer) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file stream missing" });
    }

    // Initialize GoogleDriveService
    const googleDriveService = new GoogleDriveService(
      process.env.GOOGLE_DRIVE_CLIENT_ID || "",
      process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
      process.env.GOOGLE_DRIVE_REDIRECT_URI || "",
      process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ""
    );

    // Upload CSV file to Google Drive
   const folderId = "1MWEXWJveK16lnokufh-J8NWdK7yaNvic"; // Specify the folder ID where you want to upload the CSV file
   const fileBuffer = req.file.buffer; 
   const bufferStream = new stream.PassThrough();
   bufferStream.end(fileBuffer);// Get file buffer from req.file
   // Upload CSV file to Google Drive
   const fileMetadata = await googleDriveService.saveFile(
     req.file.originalname,
     bufferStream, // Pass file buffer directly
     "text/csv",
     folderId
   );


    // Retrieve file content from Google Drive
    const csvContent = await googleDriveService.getFileContent(fileMetadata.id);

    // Parse CSV content
    const results = [];
    csvContent.split("\n").forEach((line, index) => {
      if (index === 0) return; // Skip header row
      const [SrNo, department, password, name, adminemailId] = line.split(",");
      const sanitizedAdminEmailId = adminemailId.replace(/\r/g, ""); // Remove carriage return character
      results.push({
        SrNo,
        department,
        password,
        name,
        adminemailId: sanitizedAdminEmailId,
      });

    });

    // Insert data into MongoDB
    await Admin.insertMany(results);

    return res
      .status(200)
      .json({ message: "CSV uploaded and admin data stored successfully" });
  } catch (err) {
    console.error(err);
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

    const file = req.file;

    if (!file || !file.buffer) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file stream missing" });
    }

    // Initialize GoogleDriveService
    const googleDriveService = new GoogleDriveService(
      process.env.GOOGLE_DRIVE_CLIENT_ID || "",
      process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
      process.env.GOOGLE_DRIVE_REDIRECT_URI || "",
      process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ""
    );

    // Upload CSV file to Google Drive
    const folderId = "1MWEXWJveK16lnokufh-J8NWdK7yaNvic"; // Specify the folder ID where you want to upload the CSV file
    const fileBuffer = req.file.buffer;
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer); // Get file buffer from req.file
    // Upload CSV file to Google Drive
    const fileMetadata = await googleDriveService.saveFile(
      req.file.originalname,
      bufferStream, // Pass file buffer directly
      "text/csv",
      folderId
    );

    // Retrieve file content from Google Drive
    const csvContent = await googleDriveService.getFileContent(fileMetadata.id);

    // Parse CSV content
    const results = [];
    csvContent.split("\n").forEach((line, index) => {
      if (index === 0) return; // Skip header row
      const [
        SrNo,
        students_prnNo,
        students_name,
        name,
        instructoremailId,
        password,
      ] = line.split(",");
      const sanitizedpassword = password.replace(/\r/g, ""); // Remove carriage return character
      results.push({
        SrNo,
        students: { prnNo: students_prnNo, name: students_name },
        name,
        instructoremailId,
        password: sanitizedpassword,
      });
    });

    // Insert data into MongoDB
    await Instructor.insertMany(results);

    return res
      .status(200)
      .json({ message: "CSV uploaded and admin data stored successfully" });
  } catch (err) {
    console.error(err);
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
  up,
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
