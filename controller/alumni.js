const Alumni = require("../models/Alumni");
const Token = require("../models/Token");
const stream = require("stream");
const GoogleDriveService = require("../utils/googleDriveServices");
const multer = require("multer");
const storage = multer.memoryStorage();
const up = multer({ storage: storage });

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

    const file = req.file;

    if (!file || !file.buffer) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file stream missing" });
    }

    // Initialize GoogleDriveService
    const googleDriveService = new GoogleDriveService(
      process.env.GOOGLE_DRIVE_CLIENT_ID || "",
      process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
      process.env.GOOGLE_DRIVE_REDIRECT_URI || "",
      process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ""
    );

    // Upload CSV file to Google Drive
    const folderId = "1MWEXWJveK16lnokufh-J8NWdK7yaNvic"; // Specify the folder ID where you want to upload the CSV file
    const fileBuffer = req.file.buffer;
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer); // Get file buffer from req.file
    // Upload CSV file to Google Drive
    const fileMetadata = await googleDriveService.saveFile(
      req.file.originalname,
      bufferStream, // Pass file buffer directly
      "text/csv",
      folderId
    );

    // Retrieve file content from Google Drive
    const csvContent = await googleDriveService.getFileContent(fileMetadata.id);

    // Parse CSV content
    const results = [];
    csvContent.split("\n").forEach((line, index) => {
      if (index === 0) return; // Skip header row
      const [SrNo, name, company, yearOfPassout, testimonial, image] =
        line.split(",");
      // console.log("Department :" + department);
      const sanitizedImage = image.replace(/\r/g, ""); // Remove carriage return character
      // console.log("SanitizedDepartment :" + sanitizedDepartment);
      results.push({
        SrNo,
        name,
        company,
        yearOfPassout,
        testimonial,
        image: sanitizedImage,
      });
    });

    // Insert data into MongoDB
    await Alumni.insertMany(results);

    return res
      .status(200)
      .json({ message: "CSV uploaded and alumni data stored successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
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
