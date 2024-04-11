// // controllers/notificationController.js

// const Notification = require("../models/Notification"); // Assuming you've defined your Notification model

// // Route to get all notifications
// async function getAllNotifications  (req, res) {
//   try {
//     const notifications = await Notification.find();
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching notifications" });
//   }
// };


// // add a new notification
// async function addNotification (req, res) {
//     try {
//       const { companyname, link, description,postedAt } = req.body;
//       const newNotification = new Notification({
//         companyname,
//         link,
//         description,
//         postedAt,

//       });
//       await newNotification.save();
//       res.status(201).json(newNotification);
//     } catch (error) {
//       res.status(500).json({ error: "Error adding notification" });
//     }
//   };
  

// //  update a notification
// async function updateNotification(req, res){
//     try {
//       const { updateNotifi } = req.query.updateNotifi;
//       const { companyname, link, description,postedAt } = req.body;
  
//       const updatedNotification = await Notification.findOneAndUpdate(
//         updateNotifi,
//         { companyname, link, description,postedAt },
//         { new: true } // Return the updated notification
//       );
  
//       res.status(200).json(updatedNotification);
//     } catch (error) {
//       res.status(500).json({ error: "Error updating notification" });
//     }
//   };
  



// // Route to delete a notification
// async function deleteNotification (req, res) {
//     try {
//       const { deleteNotifi } = req.query.deleteNotifi;
//       await Notification.findOneAndDelete(deleteNotifi);
//       res.status(204).send(); // No content (notification deleted)
//     } catch (error) {
//       res.status(500).json({ error: "Error deleting notification" });
//     }
//   };
  

//   module.exports = {
//     getAllNotifications,
//     addNotification,
//     updateNotification,
//     deleteNotification,

    
    
//   };

// const Alumni = require("../models/Alumni");

// // Get all alumni
// const getAllAlumni = async (req, res) => {
//   try {
//     const alumni = await Alumni.find();
//     res.json(alumni);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// // Get alumni by name
// const getAlumniByName = async (req, res) => {
//   const { name } = req.params;
//   try {
//     const alumni = await Alumni.find({ name });
//     res.json(alumni);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// // Controller function to get alumni by company name
// const getAlumniByCompanyName = async (req, res) => {
//     try {
//       const alumni = await Alumni.find({ company: req.params.companyName });
//       res.json(alumni);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   };

// // Add new alumni
// const addAlumni = async (req, res) => {
//   const { name, yearOfPassout, company, testimonial, department, image,linkedin, } = req.body;

//   try {
//     const newAlumni = new Alumni({
//       name,
//       yearOfPassout,
//       company,
//       testimonial,
//       department,
//       image,
//       linkedin,
//     });

//     const alumni = await newAlumni.save();
//     res.json(alumni);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// // Update alumni by name
// const updateAlumni = async (req, res) => {
//   const { name } = req.params;
//   const { yearOfPassout, company, testimonial, department, image,linkedin } = req.body;

//   try {
//     let alumni = await Alumni.findOne({ name });

//     if (!alumni) {
//       return res.status(404).json({ msg: "Alumni not found" });
//     }

//     alumni = await Alumni.findOneAndUpdate(
//       { name },
//       { $set: { yearOfPassout, company, testimonial, department, image,linkedin } },
//       { new: true }
//     );

//     res.json(alumni);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// // Delete alumni by name
// const deleteAlumni = async (req, res) => {
//   const { name } = req.params;

//   try {
//     let alumni = await Alumni.findOne({ name });

//     if (!alumni) {
//       return res.status(404).json({ msg: "Alumni not found" });
//     }

//     await Alumni.findOneAndRemove({ name });

//     res.json({ msg: "Alumni removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// module.exports = {
//   getAllAlumni,
//   getAlumniByName,
//   addAlumni,
//   updateAlumni,
//   deleteAlumni,
//   getAlumniByCompanyName,
// };



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

