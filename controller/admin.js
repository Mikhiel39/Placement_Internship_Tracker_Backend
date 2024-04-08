const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const Question = require("../models/Question");
const Instructor = require("../models/Instructor");

async function getInstructor(req, res) {
  const instructor = await Instructor.find().exec();
  if (!instructor)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(instructor);
}
async function getStudent(req, res) {
  const student = await Student.find().exec();
  if (!student)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(student);
}
async function getAdmin(req, res) {
  const admin = await Admin.find().exec();
  if (!admin)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(admin);
}
// async function getQuestion(req, res) {
//   const question = await Question.find().exec();
//   if (!question)
//     return res.status(404).json({ error: "No Such Instructor available" });
//   return res.json(admin);
// }
async function getInstructorByEmailID(req, res) {
  const instructor = await Instructor.find({
    instructoremailID: req.params.instructoremailID,
  }).exec();
  if (!instructor)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(instructor);
}

async function getStudentByprnno(req, res) {
  const student = await Student.find({
    prnNo: req.params.prnNo,
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
  const student = await Student.find({
    prnNo: req.params.prnNo,
  }).exec();
  const internship = await Internship.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (student.intershipStatus == "Yes") {
    if (!internship)
      return res.status(404).json({ error: "No internship available" });
    return res.json(internship);
  } else {
    return student.intershipStatus;
  }
}

async function getInternshipByInstructor(req, res) {
  const student = await Student.find({
    instructoremailId: req.params.instructoremailId,
    prnNo: req.params.prnNo,
  }).exec();
  const internship = await Internship.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (student.intershipStatus == "Yes") {
    if (!internship)
      return res.status(404).json({ error: "No internship available" });
    return res.json(internship);
  } else {
    return student.intershipStatus;
  }
}

async function getPlacementByInstructor(req, res) {
  const student = await Student.find({
    instructoremailId: req.params.InstructoremailId,
    prnNo: req.params.prnNo,
  }).exec();
  const placement = await Placement.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (student.placementStatus == "Yes") {
    if (!placement)
      return res.status(404).json({ error: "No placement available" });
    return res.json(placement);
  } else {
    return student.placementStatus;
  }
}
async function getPlacementByprnno(req, res) {
  const student = await Student.find({
    prnNo: req.params.prnNo,
  }).exec();
  const placement = await Placement.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (student.placementStatus == "Yes") {
    if (!placement)
      return res.status(404).json({ error: "No placement available" });
    return res.json(placement);
  } else {
    return student.placementStatus;
  }
}
async function getQuestionByInstructor(req, res) {
  const student = await Student.find({
    instructoremailId: req.params.InstructoremailId,
    prnNo: req.params.prnNo,
  }).exec();
  const question = await Question.find({
    _id:req.params._id,
    prnNo: student.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function getQuestionByprnno(req, res) {
  const question = await Question.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function addInternship(req, res) {
  const body = req.body;
  const internship = await Internship.findOne({
    _id:req.params._id,
    prnNo: body.prnNo,
  });
  if (!internship) {
    if (
      !body.prnNo ||
      !body.intershipName ||
      !body.intershipDescription ||
      !body.duration ||
      !body.offerLetter ||
      !body.location ||
      !body.stipend ||
      !body.companyname ||
      !body.internTitle ||
      !body.domain ||
      !body.externalInstructors ||
      !body.externalInstructors.name ||
      !body.externalInstructors.externalInstructorsemailId
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await Internship.create({
      prnNo: body.prnNo,
      intershipName: body.intershipName,
      intershipDescription: body.intershipDescription,
      duration: body.duration,
      location: body.location,
      offerLetter:body.offerLetter,
      companyname: body.companyname,
      internTitle: body.internTitle,
      domain: body.domain,
      externalInstructors: {
        name: body.externalInstructors.name,
        externalInstructorsemailId:
          body.externalInstructors.externalInstructorsemailId,
      },
    });
    await Student.findOneAndUpdate(
      { prnNo: body.prnNo }, { internshipStatus: "Yes" });
  } else {
    await Internship.findOneAndUpdate(
      { prnNo: body.prnNo },
      {
        intershipName: body.intershipName,
        intershipDescription: body.intershipDescription,
        duration: body.duration,
        location: body.location,
        companyname: body.companyname,
        internTitle: body.internTitle,
        domain: body.domain,
        externalInstructors: {
          name: body.externalInstructors.name,
          externalInstructorsemailId:
            body.externalInstructors.externalInstructorsemailId,
        },
      }
    );
  }
  return res.status(500).json({ msg: "Internal server error" });
}
async function addPlacement(req, res) {
  const body = req.body;
  const placement = await Placement.findOne({
    _id: req.params._id,
    prnNo: body.prnNo,
  });
  if (!placement) {
    if (
      !body.prnNo ||
      !body.role ||
      !body.jobDescription ||
      !body.location ||
      !body.offerLetter||
      !body.salary ||
      !body.companyname ||
      !body.domain
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await Placement.create({
      prnNo: body.prnNo,
      role: body.role,
      jobDescription: body.jobDescriptionn,
      location: body.location,
      offerLetter:body.offerLetter,
      companyname: body.companyname,
      salary: body.salary,
      domain: body.domain,
    });
    await Student.findOneAndUpdate(
      { prnNo: body.prnNo },
      { placementStatus: "Yes" }
    );
  } else {
    await Placement.findOneAndUpdate(
      { prnNo: body.prnNo },
      {
        role: body.role,
        jobDescription: body.jobDescriptionn,
        location: body.location,
        companyname: body.companyname,
        salary: body.salary,
        domain: body.domain,
      }
    );
  }
  return res.status(201).json({ msg: "success" });
}

async function addStudent(req, res) {
  const body = req.body;

  try {
    if (
      !body.prnNo ||
      !body.dateOfBirth ||
      !body.instructoremailId ||
      !body.about ||
      !body.skills ||
      !body.LinkedIN ||
      !body.Github ||
      !body.image ||
      !body.resume ||
      !body.regId ||
      !body.firstname ||
      !body.lastname ||
      !body.gender ||
      !body.internshipStatus ||
      !body.placementStatus ||
      !body.cgpa ||
      !body.year ||
      !body.department ||
      !body.contactNumber ||
      !body.studentemailId ||
      !body.password
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let student = await Student.findOne({ prnNo: body.prnNo });

    if (!student) {
      student = await Student.create({
        prnNo: body.prnNo,
        dateOfBirth: body.dateOfBirth,
        about: body.about,
        skills: body.skills,
        LinkedIN: body.LinkedIN,
        Github: body.Github,
        image: body.image,
        resume: body.resume,
        regId: body.regId,
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        internshipStatus: body.internshipStatus,
        placementStatus: body.placementStatus,
        cgpa: body.cgpa,
        year: body.year,
        instructoremailId: body.instructoremailId,
        department: body.department,
        studentemailId: body.studentemailId,
        password: body.password,
      });
    } else {
      await Student.findOneAndUpdate(
        { prnNo: body.prnNo },
        {
          dateOfBirth: body.dateOfBirth,
          regId: body.regId,
          firstname: body.firstname,
          lastname: body.lastname,
          gender: body.gender,
          contactNumber: body.contactNumber,
          internshipStatus: body.internshipStatus,
          placementStatus: body.placementStatus,
          cgpa: body.cgpa,
          year: body.year,
          department: body.department,
          studentemailId: body.studentemailId,
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
    if (
      !body.firstname ||
      !body.lastname ||
      !body.gender ||
      !body.contactNumber ||
      !body.department ||
      !body.adminemailId ||
      !body.password
    ) {
      return res.status(400).json({ msg: "msg:All field required" });
    }
    const result = await Admin.create({
      firstname: body.firstname,
      lastname: body.lastname,
      gender: body.gender,
      contactNumber: body.contactNumber,
      department: body.department,
      adminemailId: body.adminemailId,
      password: body.password,
    });
  } else {
    await Admin.findOneAndUpdate(
      { adminemailId: body.adminemailId },
      {
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        department: body.department,
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
        department: body.department
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
      _id:req.params._id,
      prnNo: req.params.prnNo });
    if (completion) {
      await Internship.findOneAndUpdate(
        { _id: req.params._id, prnNo: req.params.prnNo },
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
    const instructor =  await Instructor.findOne({
      instructoremailId: req.params.instructoremailId,
    });
    if (instructor) {
      await Instructor.findOneAndDelete({
        instructoremailId: req.params.instructoremailId,
      });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteAdmin(req, res) {
  try {
    const admin = await Instructor.findOne({
      adminemailId: req.params.emailId,
    });
    if (admin) {
      await Admin.findOneAndDelete({
        adminemailId: req.params.emailId,
      });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteStudent(req, res) {
  try {
    // Find the student based on the admin's email
    const student = await Student.findOne({
      adminemailId: req.params.emailId,
    });

    // If student exists, proceed with deletion
    if (student) {
      // Delete the student based on the PRN number
      await Student.findOneAndDelete({
        prnNo: req.params.prnNo,
      });

      // Check if instructor exists based on the instructor's email
      const instructor = await Instructor.findOne({
        instructoremailId: req.params.instructoremailId,
      });

      // If instructor exists, update their list of students
      if (instructor) {
        await Instructor.updateOne(
          { instructoremailId: req.params.instructoremailId },
          { $pull: { students: { prnNo: req.params.prnNo } } }
        );
      }
    }

    // Respond with success message
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ msg: "Internal server error" });
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
  getStudentByprnno,
  getInternshipByInstructor,
  getInternshipByprnno,
  getPlacementByprnno,
  getPlacementByInstructor,
  getQuestionByprnno,
  getQuestionByInstructor,
  updateCompletionLetterInternship,
  deleteAdmin,
  deleteInstructor,
  deleteStudent,
};
