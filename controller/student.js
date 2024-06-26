const Student = require("../models/Student");
const Question = require("../models/Question");
const Question_model = require("../models/Question_model");
const TnpCordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Notification = require("../models/Notification");
const Token = require("../models/Token");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Save uploaded files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to file name to avoid conflicts
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
async function updateimage(req, res) {
  if (!req.query.prnNo) {
    return res.status(400).json({ error: "PRN number is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.prnNo });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is missing" });
  }
  await Student.findOneAndUpdate({ prnNo: token.user }, { image: imgUrl });

  // Return success message
  return res.status(200).json({ message: "Image updated successfully" });
}
// Function to update background image
async function updatebgimage(req, res) {
  // Check if prnNo is present in the request query
  if (!req.query.prnNo) {
    return res.status(400).json({ error: "PRN number is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.prnNo });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is missing" });
  }
  await Student.findOneAndUpdate({ prnNo: token.user }, { bgimage: imgUrl });

  // Return success message
  return res
    .status(200)
    .json({ message: "Background image updated successfully" });
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
// async function updateimage(req, res) {
//   const prnNo = await Token.findOne({
//     encrypted: req.query.prnNo,
//   });
//   if (!prnNo) {
//     return res.status(404).json({ error: "Not yet Login" });
//   }
//   try {
//     // await upload.single("image")(req, res);
//     let img = null;
//     console.log(req.file);
//     if (req.file) {
//       img = req.file.path;
//     } else {
//       throw new Error("No image uploaded");
//     }
//     await Student.findOneAndUpdate(
//       { prnNo: prnNo.user },
//       {
//         image: img,
//       }
//     );
//     return res.status(201).json({ msg: "success" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }
async function updateresume(req, res) {
  const prnNo = await Token.findOne({
    encrypted: req.query.prnNo,
  });
  if (!prnNo) {
    return res.status(404).json({ error: "Not yet Login" });
  }
  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Resume URL is missing" });
  }
  try {
    await Student.findOneAndUpdate(
      { prnNo: prnNo.user },
      {
        resume: imgUrl,
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

async function logout(req, res) {
  const token = await Token.findOneAndDelete({
    encryptedprnNo: req.params.encryptedprnNo,
  }).exec();
  if (!token) return res.status(404).json({ error: "No token available" });
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
    console.log(req.query.prnNo);
    const prnNo = await Token.findOne({
      encrypted: req.query.prnNo,
    });
    console.log(prnNo);
    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" });
    }
    const student = await Student.findOne({
      prnNo: prnNo.user,
    }).exec();
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // Return the result along with the student data
    return res.json({ student });
  } catch (error) {
    // Handle any potential errors
    console.error(error);
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
  if (!req.query.prnNo) {
    return res.status(400).json({ error: "PRN number is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.prnNo });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  // Assuming you have imgUrl available in the request
  let imgUrl = req.body.imgURI;

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    imgUrl =
      "https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg";
  }

  // Continue with the rest of your logic here

  const body = req.body;

  try {
    // Check if the question already exists
    const existingQuestion = await Question.findOne({
      prnNo: token.user,
      Question_no: body.Question_no,
    });

    if (existingQuestion) {
      return res.status(400).json({ msg: "Question already exists" });
    }

    // Validate required fields
    if (
      !body.companyname ||
      !body.Question_no ||
      !body.puzzlelink ||
      !body.interviewQuestion ||
      !body.onlineAssementQuestion
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newQuestion = await Question.create({
      prnNo: token.user,
      Question_no: body.Question_no,
      companylogo: imgUrl,
      puzzlelink: body.puzzlelink,
      interviewQuestion: body.interviewQuestion,
      onlineAssementQuestion:body.onlineAssementQuestion,
      companyname: body.companyname,
    });

    // Find the question model and update it
    const questionModel = await Question_model.findOne({
      prnNo: token.user,
    });

    if (questionModel) {
      const nQuestion = {
        Question_no: body.Question_no,
        companyname: body.companyname,
        companylogo: imgUrl,
      };
      questionModel.questions.push(nQuestion);
      await questionModel.save();
      return res
        .status(400)
        .json({
          msg: "Question model is found and question added successfully",
        });
    }
    const nQuestion = await Question_model.create({
      prnNo: token.user,
      questions: {
        Question_no: body.Question_no,
        companyname: body.companyname,
        companylogo: imgUrl,
      },
    });

    // Push the new question to the questions array

    return res.status(201).json({ msg: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({ msg: error });
  }
}

async function getQuestionByprncompanyoopen(req, res) {
  // const prnNo = await Token.findOne({
  //   encrypted: req.query.prnNo,
  // });
  // if (!prnNo) {
  //   return res.status(404).json({ error: "Not yet Login" });
  // }
  const question = await Question.findOne({
    prnNo: req.query.prnNo,
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
  // upload,
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
  logout,
};
