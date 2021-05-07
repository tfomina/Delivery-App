const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const { user } = req;

    const folderPath = path.join("public", "images", user.id);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename(req, file, cb) {
    const extention = file.originalname.split(".").pop();
    cb(null, `${nanoid()}.${extention}`);
  },
});

// .jpeg, .jpg, .png
const allowedFileTypes = ["image/jpeg", "image/png"];

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
