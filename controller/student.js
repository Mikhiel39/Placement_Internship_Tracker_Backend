const Student = require("../models/Student");
const Question = require("../models/Question");

async function getQuestions(req, res) {
  const questions = await Question.find().exec();
  if (!questions)
    return res.status(404).json({ error: "No questions available" });
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
async function updateProfile(req, res) {
  const body = req.body;
  const {
    prnNo,
    regId,
    password,
    firstname,
    lastname,
    studentemailId,
    contactNumber,
    instructoremailId,
    dateOfBirth,
    gender,
    about,
    skills,
    LinkedIN,
    Github,
    resume,
    cgpa,
    internshipStatus,
    placementStatus,
    year,
    department,
  } = body;

  if (
    !about ||
    !skills ||
    !LinkedIN ||
    !Github ||
    !resume ||
    !cgpa ||
    !internshipStatus ||
    !placementStatus ||
    !year ||
    !department
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    await Student.findOneAndUpdate(
      { prnNo: prnNo },
      {
        prnNo: prnNo,
        regId: regId,
        password: password,
        firstname: firstname,
        lastname: lastname,
        studentemailId: studentemailId,
        contactNumber: contactNumber,
        instructoremailId: instructoremailId,
        dateOfBirth: dateOfBirth,
        gender: gender,
        about: about,
        skills: skills,
        LinkedIn: LinkedIN,
        Github: Github,
        resume: resume,
        cgpa: cgpa,
        internshipStatus: internshipStatus,
        placementStatus: placementStatus,
        year: year,
        department: department,
      },
      { upsert: true }
    );

    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


async function addQuestion(req, res) {
  const body = req.body;
  const question = await Question.findOne({
    _id: req.params._id,
    prnNo: req.params.prnNo,
  });
  if(!question){
    body.prnNo = req.params.prnNo;
    if (
      !body.companyname ||
      !body.puzzlelink.question ||
      !body.puzzlelink.answer ||
      !body.interview.question ||
      !body.interview.answer ||
      !body.QA.question ||
      !body.QA.answer
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
     const result = await Question.create({
       prnNo: body.prnNo,
       puzzlelink: {
         question: body.puzzlelink.question,
         answer: body.puzzlelink.answer,
       },
       interview: {
         question: body.interview.question,
         answer: body.interview.answer,
       },
       QA: {
         question: body.QA.question,
         answer: body.QA.answer,
       },
       companyname: body.companyname,
     });
     return res.status(201).json({ msg: "success" });
  }else{
     await Question.findOneAndUpdate(
       { _id:req.params._id, 
        prnNo: req.params.prnNo },
       {
         puzzlelink: {
           question: body.puzzlelink.question,
           answer: body.puzzlelink.answer,
         },
         interview: {
           question: body.interview.question,
           answer: body.interview.answer,
         },
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
  updateProfile,
};





