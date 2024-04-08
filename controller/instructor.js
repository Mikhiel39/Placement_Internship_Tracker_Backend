const Student=require("../models/Student");
const Instructor = require("../models/Instructor");
const mongoose=require("mongoose");

async function addBatch(req, res) {
  try {
    const { prnNo, instructoremailId } = req.params;
    const { students } = req.body;

    // Find the instructor by email
    const instructor = await Instructor.findOne({ instructoremailId });

    // Check if the instructor exists
    if (!instructor) {
      return res.status(404).json({ msg: "Instructor not found" });
    }

    // Check if all required fields are provided for each student
    if (students.some((student) => !student.firstname || !student.lastname)) {
      return res
        .status(400)
        .json({ msg: "All fields are required for each student" });
    }

    // Ensure each student object has a unique _id field
    const formattedStudents = students.map((student) => ({
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
      ...student,
    }));

    // Find each student by prnNo and update their instructoremailId
    const updatedStudents = await Promise.all(
      formattedStudents.map(async (studentData) => {
        const updatedStudent = await Student.findOneAndUpdate(
          { prnNo: studentData.prnNo },
          { instructoremailId },
          { new: true } // Return the updated document
        );

        // If student not found, return 404
        if (!updatedStudent) {
          throw new Error(`Student with PRN ${studentData.prnNo} not found`);
        }

        return updatedStudent;
      })
    );

    // Add students to instructor's list of students
    instructor.students.push(...updatedStudents);
    await instructor.save(); // Save changes to the instructor

    return res.status(201).json({ msg: "Success", students: updatedStudents });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}



async function deleteBatch(req, res) {
  try {
    // console.log("Instructor email:", req.params.instructoremailId);
    // console.log("Student PRN:", req.params.prnNo);

    const result = await Instructor.updateOne(
      { instructoremailId: req.params.instructoremailId },
      { $pull: { students: { prnNo:req.params.prnNo } } }
    );

    // console.log("Update result:", result);

    // Update the student's instructor email to null
    await Student.findOneAndUpdate(
      { prnNo: req.params.prnNo },
      { instructoremailId: null }
    );

    return res
      .status(201)
      .json({
        success: true,
        message: "Student removed from batch successfully.",
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}



module.exports = {
  addBatch,
  deleteBatch,
};