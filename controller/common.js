const TnpCordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Announcement=require("../models/Announcement");

async function getAll(req, res) {
  try {
    const announcement = await Announcement.find(); 
    const company = await Company.find();
    const alumni = await Alumni.find();
    const tnp = await TnpCordinator.find();
    res.status(200).json({ announcement, company, alumni, tnp });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAll,
};
