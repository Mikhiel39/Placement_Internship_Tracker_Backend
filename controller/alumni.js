
const Alumni = require("../models/Alumni");
const Token =require("../models/Token");

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
  try {
    const prnNo = await Token.findOne({ encrypted: req.query.adminemailId });

    if (!prnNo) {
      return res.status(404).json({ error: "Not yet logged in" });
    }

    const imgUrl = req.body.imgURI;

    // Check if imgUrl is present in the request body
    if (!imgUrl) {
      return res.status(400).json({ error: "Image URL is missing" });
    }

    const body = req.body;

    // Check if all required fields are present
    if (
      !body.name ||
      !body.yearOfPassout ||
      !body.alumniemailId ||
      !body.company ||
      !body.testimonial ||
      !body.linkedin
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let alumni = await Alumni.findOne({ alumniemailId: body.alumniemailId });

    if (!alumni) {
      // If alumni doesn't exist, create a new one
      await Alumni.create({
        name: body.name,
        yearOfPassout: body.yearOfPassout,
        alumniemailId: body.alumniemailId,
        company: body.company,
        image: imgUrl,
        testimonial: body.testimonial,
        department: body.department,
        linkedin: body.linkedin,
      });
    } else {
      // If alumni already exists, update the existing record
      await Alumni.findOneAndUpdate(
        { alumniemailId: body.alumniemailId },
        {
          name: body.name,
          yearOfPassout: body.yearOfPassout,
          company: body.company,
          image: imgUrl,
          testimonial: body.testimonial,
          department: body.department,
          linkedin: body.linkedin,
        }
      );
    }

    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



async function updatealumniimage(req, res) {
  if (!req.query.adminemailId) {
    return res.status(400).json({ error: "Admin EmailId is missing" });
  }

  // Attempt to find Token with the provided prnNo
  const token = await Token.findOne({ encrypted: req.query.adminemailId });

  // If Token is not found, return 404 error
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  const imgUrl = req.imgURI; // Assuming you have imgUrl available in the request

  // Check if imgUrl is present in the request
  if (!imgUrl) {
    return res.status(400).json({ error: "Image URL is missing" });
  }
  await Alumni.findOneAndUpdate(
    { alumniemailId: req.query.alumniemailId },
    { image: imgUrl }
  );

  // Return success message
  return res.status(200).json({ message: "Image updated successfully" });
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
    res.json({ message: "Alumni deleted successfully" });
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

