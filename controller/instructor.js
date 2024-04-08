const Student=require("../models/Student");
const Internship=require("../models/Internship");
const Placement = require("../models/Placement");
const Question=require("../models/Question");
const Instructor = require("../models/Instructor");

async function getInstructorByEmailID(req, res) {
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

async function getPlacementByprnno(res, req) {
    const student = await Student
      .find({
        prnNo: req.params.prnNo,
      })
      .exec();
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

async function getQuestionByprnno(res, req) {
  const question = await Question.find({
    prnNo: req.params.prnNo,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

module.exports = {
  getInstructorByEmailID,
  getStudentByprnno,
  getInternshipByprnno,
  getPlacementByprnno,
  getQuestionByprnno,
};