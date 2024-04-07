const Student=require("../models/Student");
const Instructor = require("../models/Instructor");

async function addBatch(req, res) {
  try {
    const body = req.body;
    const instructor = await Instructor.findOne({
      instructoremailId: req.params.instructoremailId,
    }); // Changed from instructoremailId to emailId
    if (
      !body.students ||
      !body.students.firstname ||
      !body.students.lastname ||
      !body.students.prnNo ||
      !body.department
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const student = await Student.findOneAndUpdate(
      {student:{prnNo:body.students.prnNo}},
      {
        instructoremailId: req.params.instructoremailId,
      },
      { new: true }
    ); // Added { new: true } to return the updated document
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    instructor.students.push(body.students);
    await instructor.save();
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}

async function deleteBatch(req, res) {
  try {
    const body = req.body;
    await Instructor.updateOne(
      { instructoremailId: req.params.instructoremailId }, // Changed from instructoremailId to emailId
      { $pull: { students: { prnNo: req.params.prnNo } } }
    );
    await Student.findOneAndUpdate({prnNo:req.params.prnNo}, {
      instructoremailId: null,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}


module.exports = {
  addBatch,
  deleteBatch,
};