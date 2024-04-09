const Student = require("../models/Student");
const Question = require("../models/Question");
const Question_model = require("../models/Question_model");

async function getQuestions(req, res) {
  const questions = await Question_model.find().exec();
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
async function updatebgimage(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate(
      { prnNo: req.query.prnNo },
      {
        bgimage: body.bgimage,
      }
    );
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
    await Student.findOneAndUpdate({prnNo:req.query.prnNo}, {
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
  const question = await Question_model.find({
    questions: {
      companyname: req.query.companyname,
    },
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function getQuestionByprnnocompanyname(req, res) {
  const question = await Question.find({
    prnNo: req.query.prnNo,
    companyname: req.query.companyname,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}
async function updateProfile(req, res) {
  const body = req.body;
  const {
    // instructoremailId,
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
    // !instructoremailId ||
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
      { prnNo: req.query.prnNo },
      {
        // instructoremailId: instructoremailId,
        about: about,
        skills: skills,
        LinkedIN: LinkedIN,
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

  try {
    // Check if the question already exists
    const existingQuestion = await Question.findOne({
      prnNo: req.query.prnNo,
      Question_no: body.Question_no,
    });

    if (existingQuestion) {
      return res.status(400).json({ msg: "Question already exists" });
    }

    // Validate required fields
    if (
      !body.companyname ||
      !body.companylogo ||
      !body.Question_no ||
      !body.puzzlelink.question ||
      !body.puzzlelink.answer ||
      !body.interview.question ||
      !body.interview.answer ||
      !body.QA.question ||
      !body.QA.answer
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Create the new question
    const newQuestion = await Question.create({
      prnNo: req.query.prnNo,
      Question_no: body.Question_no,
      companylogo: body.companylogo,
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

    // Find the question model and update it
    const questionModel = await Question_model.findOne({
      prnNo: req.query.prnNo,
    });

    if (questionModel) {
      return res.status(400).json({ msg: "Question model is found" });
    }
    const nQuestion = await Question_model.create({
      prnNo:req.query.prnNo,
      questions:{
        Question_no: body.Question_no,
        companyname: body.companyname,
        companylogo: body.companylogo,
      },
    });

    // Push the new question to the questions array
    // questionModel.questions.push(nQuestion);
    // await questionModel.save();

    return res.status(201).json({ msg: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function getQuestionByprnnoopen(req, res) {
  const question = await Question.findOne({
    prnNo: req.query.prnNo,
    Question_no: req.query.Question_no,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function deleteQuestionByprnno(req, res) {
  const question=await Question_model.findOneAndDelete({
   prnNo: req.params.prnNo,
   Question_no: req.query.Question_no
 });
 const questions = await Question.findOneAndDelete({
   prnNo: req.params.prnNo,
   Question_no: req.query.Question_no,
 });
  if (!question||!questions)
    return res.status(404).json({ error: "No question available" });
 return res.status(201).json({ msg: "Question deleted successfully" });
}

module.exports = {
  getQuestions,
  updateAbout,
  updateSkills,
  updateLinkedIN,
  updateGithub,
  updateimage,
  updatebgimage,
  updateresume,
  getQuestionBycompanyname,
  getQuestionByprnnocompanyname,
  addQuestion,
  deleteQuestionByprnno,
  getQuestionByprnnoopen,
  updateProfile,
};





