const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const Question = require("../models/Question");
const Instructor = require("../models/Instructor");
const Question_model = require("../models/Question_model");

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
    const admin = await Admin.findOne({
      adminemailId: req.query.adminemailId,
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
    const student = await Student.findOne({ prnNo: req.params.prnNo }).exec();
    if (!student || student.internshipStatus !== "Yes") {
      return res.status(404).json({ error: "No internship available" });
    }
    const internships = await Internship.find({
      name: student.name,
    }).exec();
    return res.json(internships);
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
    const student = await Student.findOne({ prnNo: req.query.prnNo }).exec();
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student.placementStatus === "Yes") {
      const placement = await Placement.findOne({
        prnNo: req.query.prnNo,
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
  const question = await Question_model.find({
    prnNo: req.query.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function addInternship(req, res) {
  try {
    const body = req.body;
    const prnNo = req.body.prnNo; // Corrected to access prnNo from query parameters

    const internship = await Internship.findOne({
      prnNo: prnNo, // Corrected to use the prnNo variable
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
        stipend: body.stipend,
        offerLetter: body.offerLetter,
        companyname: body.companyname,
        internTitle: body.internTitle,
        domain: body.domain,
        externalInstructors: body.externalInstructors,
      });

      await Student.findOneAndUpdate(
        { prnNo: prnNo }, // Corrected to use the prnNo variable
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
          offerLetter: body.offerLetter,
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
    const body = req.body;
    const placement = await Placement.findOne({
      role: body.role,
      companyname: body.companyname,
      prnNo: req.query.prnNo,
    });

    if (!placement) {
      if (
        !body.role ||
        !body.jobDescription ||
        !body.location ||
        !body.offerLetter ||
        !body.salary ||
        !body.companyname ||
        !body.domain
      ) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const result = await Placement.create({
        prnNo: req.query.prnNo,
        role: body.role,
        jobDescription: body.jobDescription, // Fix typo
        location: body.location,
        offerLetter: body.offerLetter,
        companyname: body.companyname,
        salary: body.salary,
        domain: body.domain,
      });

      await Student.findOneAndUpdate(
        { prnNo: req.query.prnNo },
        { placementStatus: "Yes" }
      );
    } else {
      await Placement.findOneAndUpdate(
        { companyname: body.companyname, prnNo: req.query.prnNo },
        {
          role: body.role,
          jobDescription: body.jobDescription,
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
  const body = req.body;

  try {
    if (
      !body.prnNo ||
      // !body.dateOfBirth ||
      // !body.instructoremailId ||
      // !body.about ||
      // !body.skills ||
      // !body.LinkedIN ||
      // !body.Github ||
      // !body.image ||
      // !body.resume ||
      !body.regId ||
      // !body.firstname ||
      !body.name ||
      // !body.gender ||
      // !body.internshipStatus ||
      // !body.placementStatus ||
      // !body.cgpa ||
      // !body.year ||
      // !body.department ||
      // !body.contactNumber ||
      // !body.studentemailId ||
      !body.password
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let student = await Student.findOne({ prnNo: body.prnNo });

    if (!student) {
      student = await Student.create({
        prnNo: body.prnNo,
        // dateOfBirth: body.dateOfBirth,
        // about: body.about,
        // skills: null,
        // LinkedIN: null,
        // Github: null,
        // image: null,
        // resume: null,
        // bgimage:null,
        regId: body.regId,
        // firstname: body.firstname,
        name: body.name,
        // gender: body.gender,
        // contactNumber: body.contactNumber,
        // internshipStatus: body.internshipStatus,
        // placementStatus: body.placementStatus,
        // cgpa: null,
        // year: body.year,
        // instructoremailId: null,
        // department: body.department,
        // studentemailId: body.studentemailId,
        password: body.password,
      });
    } else {
      await Student.findOneAndUpdate(
        { prnNo: body.prnNo },
        {
          // dateOfBirth: body.dateOfBirth,
          // about: body.about,
          // skills: null,
          // LinkedIN: null,
          // Github: null,
          // image: null,
          // resume: null,
          // bgimage:null,
          regId: body.regId,
          // firstname: body.firstname,
          name: body.name,
          // gender: body.gender,
          // contactNumber: body.contactNumber,
          // internshipStatus: body.internshipStatus,
          // placementStatus: body.placementStatus,
          // cgpa: null,
          // year: body.year,
          // instructoremailId: null,
          // department: body.department,
          // studentemailId: body.studentemailId,
          password: body.password,
        }
      );
    }

    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function addAdmin(req, res) {
  const body = req.body;
  const admin = await Admin.findOne({
    adminemailId: body.adminemailId,
  });
  if (!admin) {
    if (!body.name || !body.adminemailId || !body.password) {
      return res.status(400).json({ msg: "msg:All field required" });
    }
    const result = await Admin.create({
      name: body.name,
      adminemailId: body.adminemailId,
      password: body.password,
    });
  } else {
    await Admin.findOneAndUpdate(
      { adminemailId: body.adminemailId },
      {
        name: body.name,
        password: body.password,
      }
    );
  }
  return res.status(201).json({ msg: "success" });
}
async function addInstructor(req, res) {
  const body = req.body;

  try {
    if (
      !body.firstname ||
      !body.lastname ||
      !body.gender ||
      !body.contactNumber ||
      !body.instructoremailId ||
      !body.password ||
      !body.department
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let instructor = await Instructor.findOne({
      instructoremailId: body.instructoremailId,
    });

    if (!instructor) {
      instructor = await Instructor.create({
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        instructoremailId: body.instructoremailId,
        password: body.password,
        bgimage: null,
        image: null,
        department: body.department,
      });
    } else {
      await Instructor.findOneAndUpdate(
        { instructoremailId: body.instructoremailId },
        {
          firstname: body.firstname,
          lastname: body.lastname,
          gender: body.gender,
          contactNumber: body.contactNumber,
          password: body.password,
          bgimage: null,
          image: null,
          department: body.department,
        }
      );
    }
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function updateCompletionLetterInternship(req, res) {
  const body = req.body;
  try {
    const completion = Internship.findOne({
      internshipName: req.query.internshipName,
      prnNo: req.query.prnNo,
    });
    if (completion) {
      await Internship.findOneAndUpdate(
        { internshipName: req.query.internshipName, prnNo: req.query.prnNo },
        {
          completionLetter: body.completionLetter,
        }
      );
    }
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
      const instructor = await Instructor.findOne({
        instructoremailId: emailId,
      });

      // If instructor exists, update their list of students
      if (instructor) {
        const result = await Instructor.updateOne(
          { instructoremailId: emailId },
          { $pull: { students: { prnNo: req.query.prnNo } } }
        );
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
};
