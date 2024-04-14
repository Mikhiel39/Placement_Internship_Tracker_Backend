const TnpCordinator = require("../models/TnpCordinator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let tnpemailId = null; // Changed const to let
    if (req.body.tnpemailId != null)
      tnpemailId = req.body.tnpemailId;
    if (req.query.tnpemailId != null)
      tnpemailId = req.query.tnpemailId;
    const uniqueSuffix = tnpemailId || "default";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
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
  const { name, department, linkedin, position, tnpemailId } = req.body;

  try {
    const newTnp = new TnpCordinator({
      name,
      department,
      linkedin,
      position,
      tnpemailId,
    });

    const tnp = await newTnp.save();
    res.json(tnp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

async function updateimage(req, res) {
  try {
    let img = null; // Changed const to let
    await upload.single("image")(req, res); // Moved multer middleware here to properly handle the file upload

    // Access the uploaded file path from req.file
    if (req.file) {
      img = req.file.path;
    } else {
      throw new Error("No image uploaded");
    }
    await TnpCordinator.findOneAndUpdate(
      { tnpemailId: req.query.tnpemailId },
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
    res.json({ message: "Tnp cordinator deleted successfully", deletedTnp });
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
  
};

