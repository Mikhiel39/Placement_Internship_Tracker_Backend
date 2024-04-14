const Notification = require("../models/Notification");
//Function to get all notification
async function getNotificationAll(req, res) {
  try {
    const notification = await Notification.find();
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to fetch notification by title
async function getNotificationByTitle(req, res) {
  try {
    const titleName = req.query.titleName;
    // Query the database to find alumni by their name
    const titleofNotifi = await Notification.findOne({ title: titleName });
    if (!titleofNotifi) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(titleofNotifi);
  } catch (error) {
    console.error("Error fetching Notification by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Add new Notification
const addNotification = async (req, res) => {
  const { companyname,title,postedAt,description,link, } = req.body;

  try {
    const newNotification = new Notification({
        companyname,
        title,
        postedAt,
        description,
        link,
    });

    const notification = await newNotification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




// Controller function to delete an notification by company Name
async function deleteNotificationByCompanyName(req, res) {
  try {
    const notificationName = req.query.notificationName;
    const deletedNotification = await Notification.findOneAndDelete({ companyname: notificationName });
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ message: "Notification deleted successfully", deletedNotification });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to update an notification by company name
async function updateNotificationByCompanyName(req, res) {
  try {
    const notificationName = req.query.notificationName;
    const notificationUpdate = req.body;
    const updatedNotification = await Notification.findOneAndUpdate(
      { companyname: notificationName },
      notificationUpdate,
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(updatedNotification);
  } catch (error) {
    console.error("Error updating Notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  getNotificationAll, //Accessbile to all(make route in admin,student,instructor)
  getNotificationByTitle, //Accessbile to all(__)
  addNotification, //only access to admin hence add route of it in admin route
  deleteNotificationByCompanyName,  //  -|-
  updateNotificationByCompanyName, //  -|-
};

