const Announcement=require("../models/Announcement");

async function getAnnouncementAll(req, res) {
  try {
    const announcement = await Announcement.find();
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const addAnnouncement = async (req, res) => {
  const { headline, description } = req.body;

  try {
    const newAnnouncement = new Announcement({
      headline,description
    });
    const announcement = await newAnnouncement.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

async function deleteAnnouncement(req, res) {
  try {
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