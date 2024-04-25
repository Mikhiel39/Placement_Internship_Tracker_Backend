const Company = require("../models/Company");
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

const upload = multer({ storage: storage });

async function addCompany(req, res) {
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
        const companyData = {
          companyname: data.companyname,
          numberOfStudentsPlaced: data.numberOfStudentsPlaced,
          avgPackage: data.avgPackage,
          logo: data.logo,
          description: data.description,
          date: data.date,
          link: data.link,
          // Add more fields as necessary
        };
        results.push(companyData);
      })
      .on("end", () => {
        // Now 'results' array contains objects with data from CSV file
        // You can save this data into your Company model
        Company.insertMany(results)
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
             .json({ message: "CSV uploaded successfully"});
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


// async function updatelogo(req, res) {
//   try {
//     let logo = null; // Changed const to let
//     await upload.single("logo")(req, res); // Moved multer middleware here to properly handle the file upload

//     // Access the uploaded file path from req.file
//     if (req.file) {
//       logo = req.file.path;
//     } else {
//       throw new Error("No logo uploaded");
//     }
//     await Company.findOneAndUpdate(
//       { companyname: req.query.companyname },
//       {
//         logo: logo,
//       }
//     );
//     return res.status(201).json({ msg: "success" });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// }

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
  upload,
  addCompany,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompanyByName,
  // updatelogo,
};
