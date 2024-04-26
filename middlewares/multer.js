const multer = require("multer");

const multerUpload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      return cb(new Error("Please upload PNG files only"));
    }
    cb(null, true);
  },
});

const Uploadpdf = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Please upload PDF files only"));
    }
    cb(null, true);
  },
});

const Uploadcsv = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error("Please upload CSV files only"));
    }
    cb(null, true);
  },
});

module.exports = { multerUpload, Uploadpdf, Uploadcsv };
