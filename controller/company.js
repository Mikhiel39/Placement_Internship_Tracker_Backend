// // company.js

// const Company = require("../models/Company");

// async function getAllCompanies(req, res) {
//   try {
//     const companies = await Company.find();
//     res.json(companies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// }

// async function addCompany(req, res) {
//   try {
//     const { name, numberOfStudentsPlaced, avgPackage, logo, description } = req.body;
//     const newCompany = new Company({
//       name,
//       numberOfStudentsPlaced,
//       avgPackage,
//       logo,
//       description,
//     });
//     await newCompany.save();
//     res.status(201).json({ msg: "Company added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// }

// async function deleteCompany(req, res) {
//   try {
//     const { id } = req.params;
//     const deletedCompany = await Company.findByIdAndDelete(id);
//     if (!deletedCompany) {
//       return res.status(404).json({ msg: "Company not found" });
//     }
//     res.json({ msg: "Company deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// }

// async function updateCompany(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, numberOfStudentsPlaced, avgPackage, logo, description } = req.body;
//     const updatedCompany = await Company.findByIdAndUpdate(
//       id,
//       { name, numberOfStudentsPlaced, avgPackage, logo, description },
//       { new: true }
//     );
//     if (!updatedCompany) {
//       return res.status(404).json({ msg: "Company not found" });
//     }
//     res.json({ msg: "Company updated successfully", company: updatedCompany });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server Error" });
//   }
// }

// module.exports = {
//   getAllCompanies,
//   addCompany,
//   deleteCompany,
//   updateCompany,
// };



//2 udate
// controllers/company.js

const Company = require("../models/Company");

// Controller to add a new company (accessible only by admin)
async function addCompany(req, res) {
  try {
    // Check if user is admin
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: "You are not authorized to perform this action" });
    // }

    const {companyname, numberOfStudentsPlaced,
        avgPackage,
        logo,      
        description,link} = req.body;

    const newCompany = new Company({
      // other fields
     companyname,
     numberOfStudentsPlaced,
     avgPackage,
     logo,      
     description,
     link,
    });

    await newCompany.save();

    res.status(201).json({ message: "Company added successfully", company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to delete a company by name (accessible only by admin)
async function deleteCompany(req, res) {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: "You are not authorized to perform this action" });
    // }

    const { companyName } = req.params;

    const deletedCompany = await Company.findOneAndDelete({ companyname:companyName });

    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully", company: deletedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to update a company by name (accessible only by admin)
async function updateCompany(req, res) {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: "You are not authorized to perform this action" });
    // }

    const { companyName } = req.params;
    const updatedFields = req.body;

    const updatedCompany = await Company.findOneAndUpdate({ companyname:companyName }, updatedFields, { new: true });

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ message: "Company updated successfully", company: updatedCompany });
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

};
