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



const TnpCordinator = require("../models/TnpCordinator");
//const Tnp = require("../models/TnpCordinator");
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
async function getTnpByName(req, res) {
  try {
    const tnpName = req.query.tnpName;
    // Query the database to find alumni by their name
    const tnp = await TnpCordinator.findOne({ name: tnpName });
    if (!tnp) {
      return res.status(404).json({ error: "Tnp Coordinator not found" });
    }
    res.json(tnp);
  } catch (error) {
    console.error("Error fetching tnp by name:", error);
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

// Add new Tnp cordinator
const addTnp = async (req, res) => {
  const { name, department,image,linkedin, position,emailId} = req.body;

  try {
    const newTnp = new TnpCordinator({
      name,
      department,
      image,
      linkedin,
      position,
      emailId,
    });

    const tnp = await newTnp.save();
    res.json(tnp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




// Controller function to delete an Tnp cordinator by name
async function deleteTnpByName(req, res) {
  try {
    const tnpName = req.query.tnpName;
    const deletedTnp = await TnpCordinator.findOneAndDelete({ name: tnpName });
    if (!deletedTnp) {
      return res.status(404).json({ error: "Tnp Cordinator not found" });
    }
    res.json({ message: "Tnp cordinator deleted successfully", deletedTnp });
  } catch (error) {
    console.error("Error deleting Tnp Cordinator:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to update an TnpCordinator by name
async function updateTnpByName(req, res) {
  try {
    const tnpName = req.query.tnpName;
    const TnpUpdate = req.body;
    const updatedTnp = await TnpCordinator.findOneAndUpdate(
      { name: tnpName },
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

// Controller function to fetch alumni by company name
// async function getTnpByCompany(req, res) {
//   try {
//     const companyName = req.query.companyName;
//     // Query the database to find alumni by their company name
//     const alumni = await Alumni.find({ company: companyName });
//     if (!alumni) {
//       return res.status(404).json({ error: "Alumni not found" });
//     }
//     res.json(alumni);
//   } catch (error) {
//     console.error("Error fetching alumni by company name:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

module.exports = {
  getTnpByName,
  addTnp,
  deleteTnpByName,
  updateTnpByName,
  getTnp,
  
};

