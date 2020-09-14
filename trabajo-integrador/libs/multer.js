const multer = require("multer");
const path = require('path');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({ storage: multerStorage });

module.exports = uploadImage;
