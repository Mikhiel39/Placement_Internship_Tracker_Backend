const TnpCordinator = require("../models/TnpCordinator");
const Token =require("../models/Token");
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
//Function to get all Tnp cordinator
async function getTnp(req, res) {
  try {
    const tnp = await TnpCordinator.find();
    res.status(200).json(tnp);
  } catch (error) {
    console.error("Error fetching Tnp Cordinator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to fetch alumni by name
async function getTnpByEmail(req, res) {
  try {
    const tnpemailId = req.query.tnpemailId;
    // Query the database to find alumni by their name
    const tnp = await TnpCordinator.findOne({ tnpemailId: tnpemailId });
    if (!tnp) {
      return res.status(404).json({ error: "Tnp Coordinator not found" });
    }
    res.json(tnp);
  } catch (error) {
    console.error("Error fetching tnp by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add new Tnp cordinator
const addTnp = async (req, res) => {
  try {
    const prnNo = await Token.findOne({
      encrypted: req.query.adminemailId,
    });

    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" }); // Corrected typo in the error message
    }

    // const imgUrl = req.getCsv; // Assuming req.getCsv contains the path to the CSV file

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Assuming your CSV file has columns 'companyname', 'numberOfStudentsPlaced', 'avgPackage', etc.
        // Adjust the keys according to your CSV structure
        const coordinatorData = {
          name: data.name,
          tnpemailId: data.tnpemailId,
          position: data.position,
          linkedin: data.linkedin,
          description: data.description,
          image: data.image,
          department: data.department,
          // Add more fields as necessary
        };
        results.push(coordinatorData);
      })
      .on("end", () => {
        // Now 'results' array contains objects with data from CSV file
        // You can save this data into your Company model
        TnpCordinator.insertMany(results)
          .then((docs) => {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            return res
              .status(200)
              .json({ message: "CSV uploaded successfully" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function deleteTnp(req, res) {
  if (!req.query.adminemailId) {
    return res.status(400).json({ error: "Admin EmailId is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.adminemailId });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  await TnpCordinator.deleteMany({});

  // Return success message
  return res.status(200).json({ message: "Deletion successfully" });
}


// Controller function to delete an Tnp cordinator by name
async function deleteTnpByEmail(req, res) {
  try {
    const tnpemailId = req.query.tnpemailId;
    const deletedTnp = await TnpCordinator.findOneAndDelete({
      tnpemailId: tnpemailId,
    });
    if (!deletedTnp) {
      return res.status(404).json({ error: "Tnp Cordinator not found" });
    }
    res.json({ message: "Tnp cordinator deleted successfully" });
  } catch (error) {
    console.error("Error deleting Tnp Cordinator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to update an TnpCordinator by name
async function updateTnpByEmail(req, res) {
  try {
    const tnpemailId = req.query.tnpemailId;
    const TnpUpdate = req.body;
    const updatedTnp = await TnpCordinator.findOneAndUpdate(
      { tnpemailId: tnpemailId },
      TnpUpdate,
      { new: true }
    );
    if (!updatedTnp) {
      return res.status(404).json({ error: "Tnp -coordinator not found" });
    }
    res.json(updatedTnp);
  } catch (error) {
    console.error("Error updating Tnp cordinator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  getTnpByEmail,
  addTnp,
  deleteTnpByEmail,
  updateTnpByEmail,
  getTnp,
  deleteTnp,
};

