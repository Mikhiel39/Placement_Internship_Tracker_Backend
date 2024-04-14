const Company = require("../models/Company");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let companyname = null; // Changed const to let
    if (req.body.companyname != null)
      companyname = req.body.companyname;
    if (req.query.companyname != null)
      companyname = req.query.companyname;
    const uniqueSuffix = companyname || "default";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Controller to add a new company (accessible only by admin)
async function addCompany(req, res) {
  try {
    const {companyname, numberOfStudentsPlaced,
        avgPackage,      
        description,link} = req.body;

    const newCompany = new Company({
      // other fields
     companyname,
     numberOfStudentsPlaced,
     avgPackage,     
     description,
     link,
    });

    await newCompany.save();

    res.status(201).json({ message: "Company added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatelogo(req, res) {
  try {
    let logo = null; // Changed const to let
    await upload.single("logo")(req, res); // Moved multer middleware here to properly handle the file upload

    // Access the uploaded file path from req.file
    if (req.file) {
      logo = req.file.path;
    } else {
      throw new Error("No logo uploaded");
    }
    await Company.findOneAndUpdate(
      { companyname: req.query.companyname },
      {
        logo: logo,
      }
    );
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// Controller to delete a company by name (accessible only by admin)
async function deleteCompany(req, res) {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: "You are not authorized to perform this action" });
    // }

    const { companyName } = req.query;

    const deletedCompany = await Company.findOneAndDelete({ companyname:companyName });

    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to update a company by name (accessible only by admin)
async function updateCompany(req, res) {
  try {
    const { companyName } = req.query;
    const updatedFields = req.body;

    const updatedCompany = await Company.findOneAndUpdate({ companyname:companyName }, updatedFields, { new: true });

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ message: "Company updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to get all companies (accessible by all)
async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Controller function to get a company by its name
async function getCompanyByName(req, res) {
    try {
  
      // Find the company by name
      const company = await Company.findOne({ companyname: req.query.companyname });
  
      // If company not found, return 404
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
  
      // If company found, return it in the response
      return res.json(company);
    } catch (error) {
      console.error("Error fetching company by name:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  

module.exports = {
  addCompany,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompanyByName,
  updatelogo,
};
