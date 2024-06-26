const TnpCoordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Announcement = require("../models/Announcement");
const Student = require("../models/Student");

async function getAll(req, res) {
  try {
    const announcements = await Announcement.find();
    const companies = await Company.find();
    let avgPackage = 0,
      totalCompanies = 0,
      totalStudents = 0;
    for (let i = 0; i < companies.length; i++) {
      avgPackage += companies[i].avgPackage;
      totalCompanies++;
      totalStudents += companies[i].numberOfStudentsPlaced;
    }
    const stat = {
      avgPackage: avgPackage / totalCompanies,
      totalCompanies: totalCompanies,
      totalStudents: totalStudents,
    };
    const alumni = await Alumni.find();
    const tnp = await TnpCoordinator.find();
    res.status(200).json({ announcements, companies, stat, alumni, tnp });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateInstructorEmailId(req, res) {
  const student = await Student.findOne({
    prnNo: req.query.prnNo,
  }).exec();
  if (!student)
    return res.status(404).json({ error: "No Such Student available" });
  await Student.findOneAndUpdate(
    {
      prnNo: req.query.prnNo,
    },
    { instructoremailId: req.body.instructoremailId }
  ).exec();
}

module.exports = {
  getAll,
  updateInstructorEmailId,
};
