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
    emailID: req.params.emailID,
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
  if (
    !body.prnNo ||
    !body.intershipName ||
    !body.offerLetter ||
    !body.intershipDescription ||
    !body.duration ||
    !body.location ||
    !body.stipend ||
    !body.companyname ||
    !body.internTitle ||
    !body.domain ||
    !body.externalInstructors ||
    !body.externalInstructors.name ||
    !body.externalInstructors.email
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const result = await Internship.create({
      prnNo: body.prnNo,
      intershipName: body.intershipName,
      offerLetter: body.offerLetter,
      intershipDescription: body.intershipDescription,
      duration: body.duration,
      location: body.location,
      companyname: body.companyname,
      internTitle: body.internTitle,
      domain: body.domain,
      externalInstructors: {
        name: body.externalInstructors.name,
        email: body.externalInstructors.email,
      },
    });
    await Student.findByIdAndUpdate(body.prnNo, { intershipStatus: "Yes" });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function addPlacement(req, res) {
  const body = req.body;
  if (
    !body.prnNo ||
    !body.role ||
    !body.offerLetter ||
    !body.jobDescription ||
    !body.location ||
    !body.salary ||
    !body.companyname ||
    !body.domain
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const result = await Placement.create({
      prnNo: body.prnNo,
      role: body.role,
      offerLetter: body.offerLetter,
      offerLetter: body.offerLetter,
      jobDescription: body.jobDescriptionn,
      location: body.location,
      companyname: body.companyname,
      salary: body.salary,
      domain: body.domain,
    });
    await Student.findByIdAndUpdate(body.prnNo, { placementStatus: "Yes" });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function addInstructor(res, req) {
  const body = req.body;
  if (
    !body.firstname ||
    !body.lastname ||
    !body.gender ||
    !body.contactNumber ||
    !body.emailId ||
    !body.department ||
    !body.password
  ) {
    return res.status(400).json({ msg: "msg:All field required" });
  }
  const result = await Instructor.create({
    firstname: body.firstname,
    lastname: body.lastname,
    gender: body.gender,
    contactNumber: body.contactNumber,
    emailId: body.emailId,
    password: body.password,
    department: body.department,
  });
  return res.status(201).json({ msg: "success" });
}
async function addStudent(res, req) {
  const body = req.body;
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
    !body.emailId ||
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
    emailId: body.emailId,
    password: body.password,
  });
  return res.status(201).json({ msg: "success" });
}
async function addAdmin(res, req) {
  const body = req.body;
  if (
    !body.firstname ||
    !body.lastname ||
    !body.gender ||
    !body.contactNumber ||
    !body.department ||
    !body.emailId ||
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
    emailId: body.emailId,
    password: body.password,
  });
  return res.status(201).json({ msg: "success" });
}
async function addInstructor(res, req) {
  const body = req.body;
  if (
    !body.firstname ||
    !body.lastname ||
    !body.gender ||
    !body.contactNumber ||
    !body.emailId ||
    !body.password
  ) {
    return res.status(400).json({ msg: "msg:All field required" });
  }
  const result = await Instructor.create({
    firstname: body.firstname,
    lastname: body.lastname,
    gender: body.gender,
    contactNumber: body.contactNumber,
    emailId: body.emailId,
    password: body.password,
  });
  return res.status(201).json({ msg: "success" });
}
async function addBatch(req, res) {
  try {
    const batch = await Instructor.findOne({ emailId: req.params.emailId });
    const body = req.body;
    if (
      !body.students ||
      !body.students.firstname ||
      !body.students.lastname ||
      !body.students.prnNo ||
      !body.department
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    batch.students.push(body.students);
    await batch.save();
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}

async function updateCompletionLetterInternship(res, req) {
  const body = req.body;
  try {
    await Internship.findByIdAndUpdate(prnNo, { completionLetter: body.prnNo });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateInstructorMail(res, req) {
  const body = req.body;
  try {
    await Student.findByIdAndUpdate(prnNo, { InstructoremailId: body.emailID });
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
  addBatch,
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
  updateInstructorMail,
};
