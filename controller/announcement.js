const Announcement=require("../models/Announcement");
const Token=require("../models/Token");

async function getAnnouncementAll(req, res) {
  try {
     const token = await Token.findOne({ encrypted: req.query.adminemailId });
     if (!token) {
       return res.status(400).send("Not yet logged in");
     }
    const announcement = await Announcement.find();
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
const addAnnouncement = async (req, res) => {
  try {
    // Check if the admin is logged in
    const token = await Token.findOne({ encrypted: req.query.adminemailId });
    if (!token) {
      return res.status(400).send("Not yet logged in");
    }

    // Extract headline and description from the request body
    const { headline, description } = req.body;

    // Create a new Announcement instance
    const newAnnouncement = new Announcement({
      headline,
      description,
    });

    // Save the new announcement to the database
    const announcement = await newAnnouncement.save();

    // Send a success response
    res.status(200).json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


async function deleteAnnouncement(req, res) {
  try {
     const token = await Token.findOne({ encrypted: req.query.adminemailId });
     if (!token) {
       return res.status(400).send("Not yet logged in");
     }
    const headline = req.query.headline;
    const deletedAnnouncement = await Announcement.findOneAndDelete({
      headline: headline,
    });
    if (!deletedAnnouncement) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAnnouncementAll, 
  addAnnouncement,
  deleteAnnouncement,
};