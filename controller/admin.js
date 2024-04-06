const Student = require("../models/Student");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const Question = require("../models/Question");
const Progress = require("../models/Progress");
const Instructor = require("../models/Instructor");

async function getInstructor(res, req) {
  const instructor = await Instructor.find().exec();
  if (!instructor)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(instructor);
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
  const progress = await Progress.find({
    prnNo: req.params.prnNo,
  }).exec();
  const internship = await Internship.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (progress.intershipStatus == "Yes") {
    if (!internship)
      return res.status(404).json({ error: "No internship available" });
    return res.json(internship);
  } else {
    return progress.intershipStatus;
  }
}
async function getInternshipByInstructor(res, req) {
  const progress = await Progress.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  const internship = await Internship.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (progress.intershipStatus == "Yes") {
    if (!internship)
      return res.status(404).json({ error: "No internship available" });
    return res.json(internship);
  } else {
    return progress.intershipStatus;
  }
}

async function getPlacementByInstructor(res, req) {
  const progress = await Progress.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  const placement = await Placement.find({
    prnNo: req.params.InstructoremailId,
  }).exec();
  if (progress.placementStatus == "Yes") {
    if (!placement)
      return res.status(404).json({ error: "No placement available" });
    return res.json(placement);
  } else {
    return progress.placementStatus;
  }
}
async function getPlacementByprnno(res, req) {
  const progress = await Progress.find({
    prnNo: req.params.prnNo,
  }).exec();
  const placement = await Placement.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (progress.placementStatus == "Yes") {
    if (!placement)
      return res.status(404).json({ error: "No placement available" });
    return res.json(placement);
  } else {
    return progress.placementStatus;
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
async function addStudent(res, req) {
  const body = req.body;
  if (
    !body.prnNo ||
    !body.dateOfBirth ||
    !body.regId ||
    !body.firstname ||
    !body.lastname ||
    !body.gender ||
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

module.exports = {
  getInstructor,
  addInstructor,
  addStudent,
  addAdmin,
  getStudentByInstructor,
  getInstructorByEmailID,
  getStudentByprnno,
  getInternshipByInstructor,
  getInternshipByprnno,
  getPlacementByprnno,
  getPlacementByInstructor,
  getQuestionByprnno,
  getQuestionByInstructor,
};
