const multer = require("multer");
// const { Datauri}= require("datauri");
// const { path} =require("path");
const multerUpload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      return cb(new Error("please upload png"));
    }
    cb(undefined, true);
  },
});

const Uploadpdf = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("please upload pdf"));
    }
    cb(undefined, true);
  },
});

const Uploadcsv = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error("please upload csv"));
    }
    cb(undefined, true);
  },
});
module.exports = { multerUpload, Uploadpdf, Uploadcsv };
