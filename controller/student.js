const Student = require("../models/Student");
const Question = require("../models/Question");

async function getQuestions(req, res) {
  const questions = await Question.find().exec();
  if (!questions)
    return res.status(404).json({ error: "No Such Instructor available" });
  return res.json(questions);
}

async function updateAbout(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, { about: body.about });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateSkills(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      skills: body.skills,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateLinkedIN(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      LinkedIN: body.LinkedIN,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateGithub(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      Github: body.Github,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateimage(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      image: body.image,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateresume(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      resume: body.resume,
    });
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function getQuestionBycompanyname(req, res) {
  const question = await Question.find({
    companyname: req.params.companyname,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function getQuestionByprnnocompanyname(req, res) {
  const question = await Question.find({
    prnNo: req.params.prnNo,
    companyname: req.params.companyname,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function addQuestion(req, res) {
  const body = req.body;
  const question = Question.findOne({
    prnNo: req.params.prnNo,
  });
  if(!question){
    body.prnNo = req.params.prnNo;
    if (
      !body.companyname ||
      !body.companyexp ||
      !body.puzzlelink ||
      !body.QA.question ||
      !body.QA.answer
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
     const result = await Question.create({
       prnNo: body.prnNo,
       companyexp: body.companyexp,
       puzzlelink: body.puzzlelink,
       QA: {
         question: body.QA.question,
         answer: body.QA.answer,
       },
       companyname: body.companyname,
     });
     await Student.findOneAndUpdate(body.prnNo, { placementStatus: "Yes" });
     return res.status(201).json({ msg: "success" });
  }else{
     await Question.findOneAndUpdate(
       { prnNo: req.params.prnNo },
       {
         companyexp: body.companyexp,
         puzzlelink: body.puzzlelink,
         QA: {
           question: body.QA.question,
           answer: body.QA.answer,
         },
         companyname: body.companyname,
       }
     ); 
  }
  
}
async function deleteQuestionByprnnocompanyname(req, res) {
  const question=await Question.findOneAndDelete({
   prnNo: req.params.prnNo,
   companyname: req.params.companyname,
 });
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

module.exports = {
  getQuestions,
  updateAbout,
  updateSkills,
  updateLinkedIN,
  updateGithub,
  updateimage,
  updateresume,
  getQuestionBycompanyname,
  getQuestionByprnnocompanyname,
  addQuestion,
  deleteQuestionByprnnocompanyname,
};





