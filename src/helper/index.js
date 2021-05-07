const fs = require("fs");

const requiredMessage = "Обязательное поле";

const deleteFileFromDisk = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { requiredMessage, deleteFileFromDisk };
