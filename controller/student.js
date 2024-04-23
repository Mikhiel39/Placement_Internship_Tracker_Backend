const Student = require("../models/Student");
const Question = require("../models/Question");
const Question_model = require("../models/Question_model");
const TnpCordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Notification = require("../models/Notification");
const Token=require("../models/Token");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let prnNo = null;
    if (req.query.prnNo != null) prnNo = req.query.prnNo;
    const uniqueSuffix = prnNo || "default";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

async function getQuestions(req, res) {
  const questions = await Question_model.find().exec();
  if (!questions)
    return res.status(404).json({ error: "No questions available" });
  return res.json(questions);
}

async function updateAbout(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate(
      { prnNo: req.params.prnNo },
      { about: body.about }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateSkills(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate(
      { prnNo: req.params.prnNo },
      {
        skills: body.skills,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updatebgimage(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  // const body = req.body;
  try {
    // await upload.single("bgimage")(req, res);
    let img = null;
    console.log(req.file);
    if (req.file) {
      img = req.file.path;
    } else {
      throw new Error("No image uploaded");
    }
    await Student.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        bgimage: img,
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
    await Student.findOneAndUpdate(
      { prnNo: req.params.prnNo },
      {
        LinkedIN: body.LinkedIN,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateGithub(req, res) {
  const body = req.body;
  try {
    await Student.findOneAndUpdate(
      { prnNo: req.params.prnNo },
      {
        Github: body.Github,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateimage(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  try {
    // await upload.single("image")(req, res);
    let img = null;
    console.log(req.file);
    if (req.file) {
      img = req.file.path;
    } else {
      throw new Error("No image uploaded");
    }
    await Student.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        image: img,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}
async function updateresume(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  let resume = null;
  if (req.file) {
    resume = req.file.path;
  } else {
    throw new Error("No resume uploaded");
  }
  try {
    await Student.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        resume: resume,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function getQuestionBycompanyname(req, res) {
  const question = await Question.find({
    companyname: req.query.companyname,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function getToken(req, res) {
  const token = await Token.find({
    encryptedprnNo: req.query.encryptedprnNo,
  }).exec();
  if (!token)
    return res.status(404).json({ error: "No question available" });
  return res.json(token);
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
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const body = req.body;
  const {
    CodeForces,
    CodeChef,
    Leetcode,
    about,
    skills,
    LinkedIN,
    Github,
    cgpa,
    internshipStatus,
    placementStatus,
    year,
    department,
  } = body;

  if (
    !CodeForces ||
    !CodeChef ||
    !Leetcode ||
    !about ||
    !skills ||
    !LinkedIN ||
    !Github ||
    !cgpa ||
    !internshipStatus ||
    !placementStatus ||
    !year ||
    !department
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Assuming 'upload' is an instance of multer
    // await upload.single("resume")(req, res);
    // let resume = null;
    // if (req.file) {
    //   resume = req.file.path;
    // } else {
    //   throw new Error("No resume uploaded");
    // }
    await Student.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        CodeForces,
        CodeChef,
        Leetcode,
        about,
        skills,
        LinkedIN,
        Github,
        cgpa,
        internshipStatus,
        placementStatus,
        year,
        department,
      },
      { upsert: true }
    );

    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function getStudentByprnno(req, res) {
  try {
    const prnNo= await Token.find({
      encrypted:req.query.prnNo
    })
    if(!prnNo){
      return res.status(404).json({ error: "Not yet Login" });
    }
    const student = await Student.findOne({
      prnNo: prnNo.user,
    }).exec();
    if (!student)
      return res.status(404).json({ error: "No Such Student available" });

    // Return the result along with the student data
    return res.json({ student });
  } catch (error) {
    // Handle any potential errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
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

async function addQuestion(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }

  const body = req.body;

  try {
    // Check if the question already exists
    const existingQuestion = await Question.findOne({
      prnNo: prnNo.user,
      Question_no: body.Question_no,
    });

    if (existingQuestion) {
      return res.status(400).json({ msg: "Question already exists" });
    }

    // Validate required fields
    if (
      !body.companyname ||
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
    let companylogo = null; // Changed const to let
    // await upload.single("companylogo")(req, res); // Moved multer middleware here to properly handle the file upload

    // Access the uploaded file path from req.file
    if (req.file) {
      companylogo = req.file.path;
    } else {
      throw new Error("No companylogo uploaded");
    }
    // Create the new question
    const newQuestion = await Question.create({
      prnNo: prnNo.user,
      Question_no: body.Question_no,
      companylogo: companylogo,
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
      prnNo: prnNo.user,
    });

    if (questionModel) {
      const nQuestion = {
        Question_no: body.Question_no,
        companyname: body.companyname,
        companylogo: companylogo,
      };
      questionModel.questions.push(nQuestion);
      await questionModel.save();
      return res.status(400).json({ msg: "Question model is found" });
    }
    const nQuestion = await Question_model.create({
      prnNo: prnNo.user,
      questions: {
        Question_no: body.Question_no,
        companyname: body.companyname,
        companylogo: companylogo,
      },
    });

    // Push the new question to the questions array

    return res.status(201).json({ msg: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function getQuestionByprncompanyoopen(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const question = await Question.findOne({
    prnNo: prnNo.user,
    companyname: req.query.companyname,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function getQuestionByprnnoopen(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const question = await Question.findOne({
    prnNo: prnNo.user,
    Question_no: req.query.Question_no,
  }).exec();
  if (!question)
    return res.status(404).json({ error: "No question available" });
  return res.json(question);
}

async function deleteQuestionByprnno(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const result = await Question_model.updateOne(
    { prnNo: prnNo.user },
    { $pull: { questions: { Question_no: req.query.Question_no } } }
  );
  const questions = await Question.findOneAndDelete({
    prnNo: prnNo.user,
    Question_no: req.query.Question_no,
  });
  if (!questions || !result)
    return res.status(404).json({ error: "No question available" });
  return res.status(201).json({ msg: "Question deleted successfully" });
}

module.exports = {
  upload,
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
  getQuestionByprncompanyoopen,
  getStudentByInstructor,
  getStudentByprnno,
  getToken,
};
