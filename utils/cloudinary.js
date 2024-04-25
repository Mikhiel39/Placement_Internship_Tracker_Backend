const cloudinary = require("cloudinary").v2;
const DataURI = require("datauri");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const geturl = async (req, res, next) => {
  const dataUri = new DataURI();
  if (req.file) {
    dataUri.format(".png", req.file.buffer);
    const response = await cloudinary.uploader.upload(dataUri.content, {
      public_id: req.file.originalname.replace(".png", ""),
    });
    if (!response) {
      throw new Error("Something went wrong");
    }
    req.imgURI = response.secure_url;
  }
  next();
};

const getUrl = async (req, res, next) => {
  const dataUri = new DataURI();
  if (req.file) {
    dataUri.format(".pdf", req.file.buffer);
    const response = await cloudinary.uploader.upload(dataUri.content, {
      public_id: req.file.originalname.replace(".pdf", ""),
    });
    if (!response) {
      throw new Error("Something went wrong");
    }
    req.imgURI = response.secure_url;
  }
  next();
};

const getCsv = async (req, res, next) => {
  const dataUri = new DataURI();
  if (req.file) {
    dataUri.format(".csv", req.file.buffer);
    const response = await cloudinary.uploader.upload(dataUri.content, {
      public_id: req.file.originalname.replace(".csv", ""),
    });
    if (!response) {
      throw new Error("Something went wrong");
    }
    req.imgURI = response.secure_url;
  }
  next();
};

module.exports = { geturl, getUrl, getCsv };
