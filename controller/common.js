const TnpCordinator = require("../models/TnpCordinator");
const Company = require("../models/Company");
const Alumni = require("../models/Alumni");
const Notification = require("../models/Notification");

async function getAll(req, res) {
  try {
    const company = await Company.find();
    const alumni = await Alumni.find();
    const tnp = await TnpCordinator.find();
    res.status(200).json({ company, alumni, tnp });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAll,
};
