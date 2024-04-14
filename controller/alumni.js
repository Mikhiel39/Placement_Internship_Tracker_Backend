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



const Alumni = require("../models/Alumni");
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
async function getAlumniByName(req, res) {
  try {
    const alumniName = req.query.alumniName;
    // Query the database to find alumni by their name
    const alumni = await Alumni.findOne({ name: alumniName });
    if (!alumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni by name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to add a new alumni

// async function addAlumni(req, res) {
//   try {
//     const alumniData = req.body;
//     const newAlumni = await Alumni.create(alumniData);
//     res.status(201).json(newAlumni);
//   } catch (error) {
//     console.error("Error adding alumni:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// Add new alumni
const addAlumni = async (req, res) => {
  const { name, yearOfPassout, company, testimonial, department, image,linkedin, } = req.body;

  try {
    const newAlumni = new Alumni({
      name,
      yearOfPassout,
      company,
      testimonial,
      department,
      image,
      linkedin,
    });

    const alumni = await newAlumni.save();
    res.json(alumni);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




// Controller function to delete an alumni by name
async function deleteAlumniByName(req, res) {
  try {
    const alumniName = req.query.alumniName;
    const deletedAlumni = await Alumni.findOneAndDelete({ name: alumniName });
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
async function updateAlumniByName(req, res) {
  try {
    const alumniName = req.query.alumniName;
    const alumniUpdate = req.body;
    const updatedAlumni = await Alumni.findOneAndUpdate(
      { name: alumniName },
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
  getAlumniByName,
  addAlumni,
  deleteAlumniByName,
  updateAlumniByName,
  getAlumniByCompany,
  getAlumni,
  
};

