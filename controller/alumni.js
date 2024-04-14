
const Alumni = require("../models/Alumni");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let alumniemailId = null; // Changed const to let
    if (req.body.alumniemailId != null)
      alumniemailId = req.body.alumniemailId;
    if (req.query.alumniemailId != null)
      alumniemailId = req.query.alumniemailId;
    const uniqueSuffix = alumniemailId || "default";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
//Function to get all alumni
async function getAlumni(req, res) {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to fetch alumni by name
async function getAlumniByEmail(req, res) {
  try {
    const alumniemailId = req.query.alumniemailId;
    // Query the database to find alumni by their name
    const alumni = await Alumni.findOne({ alumniemailId: alumniemailId });
    if (!alumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add new alumni
const addAlumni = async (req, res) => {
  const { name, yearOfPassout, alumniemailId, company, testimonial, department,linkedin, } = req.body;

  try {
    const newAlumni = new Alumni({
      name,
      yearOfPassout,
      alumniemailId,
      company,
      testimonial,
      department,
      linkedin,
    });

    const alumni = await newAlumni.save();
    res.json(alumni);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

async function updatealumniimage(req, res) {
  try {
    let img = null; // Changed const to let
    await upload.single("image")(req, res); // Moved multer middleware here to properly handle the file upload

    // Access the uploaded file path from req.file
    if (req.file) {
      img = req.file.path;
    } else {
      throw new Error("No image uploaded");
    }
    await Alumni.findOneAndUpdate(
      { alumniemailId: req.query.alumniemailId },
      {
        image: img,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
}


// Controller function to delete an alumni by name
async function deleteAlumniByEmail(req, res) {
  try {
    const alumniemailId = req.query.alumniemailId;
    const deletedAlumni = await Alumni.findOneAndDelete({
      alumniemailId: alumniemailId,
    });
    if (!deletedAlumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json({ message: "Alumni deleted successfully", deletedAlumni });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to update an alumni by name
async function updateAlumniByEmail(req, res) {
  try {
    const alumniemailId = req.query.alumniemailId;
    const alumniUpdate = req.body;
    const updatedAlumni = await Alumni.findOneAndUpdate(
      { alumniemailId: alumniemailId },
      alumniUpdate,
      { new: true }
    );
    if (!updatedAlumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json(updatedAlumni);
  } catch (error) {
    console.error("Error updating alumni:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to fetch alumni by company name
async function getAlumniByCompany(req, res) {
  try {
    const companyName = req.query.companyName;
    // Query the database to find alumni by their company name
    const alumni = await Alumni.find({ company: companyName });
    if (!alumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni by company name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAlumniByEmail,
  addAlumni,
  deleteAlumniByEmail,
  updateAlumniByEmail,
  getAlumniByCompany,
  updatealumniimage,
  getAlumni,
};

