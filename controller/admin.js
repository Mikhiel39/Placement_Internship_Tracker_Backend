const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const Question = require("../models/Question");
const Instructor = require("../models/Instructor");

async function getInstructor(res, req) {
  const instructor = await Instructor.find().exec();
  if (!instructor)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(instructor);
}
async function getStudent(res, req) {
  const student = await Student.find().exec();
  if (!student)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(student);
}
async function getAdmin(res, req) {
  const admin = await Admin.find().exec();
  if (!admin)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(admin);
}
async function getInstructorByEmailID(res, req) {
  const instructor = await Instructor.find({
    instructoremailID: req.params.instructoremailID,
  }).exec();
  if (!instructor)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(instructor);
}

async function getStudentByprnno(res, req) {
  const student = await Student.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (!student)
    return res.status(404).json({ error: "No Such Student available" });
  return res.json(student);
}
async function getStudentByInstructor(res, req) {
  const student = await Student.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (!student)
    return res.status(404).json({ error: "No Such Student available" });
  return res.json(student);
}

async function getInternshipByprnno(res, req) {
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

async function getInternshipByInstructor(res, req) {
  const student = await Student.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  const internship = await Internship.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (student.intershipStatus == "Yes") {
    if (!internship)
      return res.status(404).json({ error: "No internship available" });
    return res.json(internship);
  } else {
    return student.intershipStatus;
  }
}

async function getPlacementByInstructor(res, req) {
  const student = await Student.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  const placement = await Placement.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (student.placementStatus == "Yes") {
    if (!placement)
      return res.status(404).json({ error: "No placement available" });
    return res.json(placement);
  } else {
    return student.placementStatus;
  }
}
async function getPlacementByprnno(res, req) {
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
async function getQuestionByInstructor(res, req) {
  const question = await Question.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function getQuestionByprnno(res, req) {
  const question = await Question.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function addInternship(req, res) {
  const body = req.body;
  const internship = Internship.findOne({
    prnNo: body.prnNo,
  });
  if(!internship){
     if (
       !body.prnNo ||
       !body.intershipName ||
       !body.intershipDescription ||
       !body.duration ||
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
     const result = await Placement.create({
       prnNo: body.prnNo,
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
     });
     await Student.findByIdAndUpdate(body.prnNo, { placementStatus: "Yes" });
  }else{
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
  const placement = Placement.findOne({
    prnNo: body.prnNo,
  });
  if(!placement){
    if (
    !body.prnNo ||
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
      prnNo: body.prnNo,
      role: body.role,
      jobDescription: body.jobDescriptionn,
      location: body.location,
      companyname: body.companyname,
      salary: body.salary,
      domain: body.domain,
    });
    await Student.findByIdAndUpdate(body.prnNo, { placementStatus: "Yes" });
  }else{
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

async function addStudent(res, req) {
  const body = req.body;
  const student = Student.findOne({
    prnNo: body.prnNo,
  });
  if(!student){
    if (
      !body.prnNo ||
      !body.dateOfBirth ||
      !body.regId ||
      !body.firstname ||
      !body.lastname ||
      !body.gender ||
      !body.intershipStatus ||
      !body.placementStatus ||
      !body.cgpa ||
      !body.year ||
      !body.department ||
      !body.contactNumber ||
      !body.studentemailId ||
      !body.password
    ) {
      return res.status(400).json({ msg: "msg:All field required" });
    }
    const result = await Student.create({
      prnNo: body.prnNo,
      dateOfBirth: body.dateOfBirth,
      regId: body.regId,
      firstname: body.firstname,
      lastname: body.lastname,
      gender: body.gender,
      contactNumber: body.contactNumber,
      intershipStatus: body.intershipStatus,
      placementStatus: body.placementStatus,
      cgpa: body.cgpa,
      year: body.year,
      department: body.department,
      studentemailId: body.studentemailId,
      password: body.password,
    });
  }else{
    await Student.findOneAndUpdate(
      { prnNo: body.prnNo },
      {
        dateOfBirth: body.dateOfBirth,
        regId: body.regId,
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        intershipStatus: body.intershipStatus,
        placementStatus: body.placementStatus,
        cgpa: body.cgpa,
        year: body.year,
        department: body.department,
        studentemailId: body.studentemailId,
        password: body.password,
      }
    );
  }
  
  return res.status(201).json({ msg: "success" });
}
async function addAdmin(res, req) {
  const body = req.body;
  const admin = Admin.findOne({
    adminemailId: body.adminemailId,
  });
  if(!admin){
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
  }else{
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
async function addInstructor(res, req) {
  const body = req.body;
  const instructor = Instructor.findOne({
    instructoremailId: body.instructoremailId,
  });
  if(!instructor){
      if (
        !body.firstname ||
        !body.lastname ||
        !body.gender ||
        !body.contactNumber ||
        !body.instructoremailId ||
        !body.password
      ) {
        return res.status(400).json({ msg: "msg:All field required" });
      }
      const result = await Instructor.create({
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        instructoremailId: body.instructoremailId,
        password: body.password,
      });
  }else{
    await Instructor.findOneAndUpdate(
      { instructoremailId: body.instructoremailId },
      {
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        contactNumber: body.contactNumber,
        password: body.password,
      }
    ); 
  }
  return res.status(201).json({ msg: "success" });
}
async function updateCompletionLetterInternship(res, req) {
  const body = req.body;
  try {
    const completion=Internship.findOne({ prnNo: req.params.prnNo })
    if(completion){
         await Internship.findOneAndUpdate({prnNo:req.params.prnNo}, {
           completionLetter: body.completionLetter,
         });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateOfferLetterInternship(res, req) {
  const body = req.body;
  try {
    const internship = Internship.findOne({ prnNo: req.params.prnNo });
    if(internship){
        await Internship.findOneAndUpdate({prnNo:req.params.prnNo}, {
          offerLetter: body.offerLetter,
        });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateOfferLetterPlacement(res, req) {
  const body = req.body;
  try {
    const placement = Placement.findOne({ prnNo: req.params.prnNo });
    if(placement){
        await Placement.findOneAndUpdate({prnNo:req.params.prnNo}, {
          offerLetter: body.offerLetter,
        });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteInstructor(res, req) {
  const body = req.body;
  try {
    const instructor = Instructor.findOne({
      instructoremailId: req.params.instructoremailId,
    });
    if(instructor){
      await Instructor.findOneAndDelete({
        instructoremailId: req.params.instructoremailId,
      });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteAdmin(res, req) {
  const body = req.body;
  try {
     const admin = Instructor.findOne({
       adminemailId: req.params.emailId,
     });
    if(admin){
         await Admin.findOneAndDelete({
           adminemailId: req.params.emailId,
         });
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function deleteStudent(res, req) {
  const body = req.body;
  try {
    const student = Student.findOne({
      adminemailId: req.params.emailId,
    });
    if(student){
        await Student.findOneAndDelete({
          prnNo: req.params.prnNo,
        });
        const instructor = Instructor.findOne({
          instructoremailId: req.params.instructoremailId,
        });
        if (instructor) {
          await Instructor.updateOne(
            { instructoremailId: req.params.instructoremailId },
            { $pull: { students: { prnNo: req.params.prnNo } } }
          );
        }
    }
    return res.status(201).json({ msg: "success" });
  } catch (error) {
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
  updateOfferLetterInternship,
  updateOfferLetterPlacement,
  deleteAdmin,
  deleteInstructor,
  deleteStudent,
};
