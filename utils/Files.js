const fs = require("fs");
const path = require("path");
const multer = require("multer");

// ? ************************************* File storage ******************************** */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isDirectory = `public/${req.fileUploadPath}`;
    if (!fs.existsSync(isDirectory)) {
      fs.mkdirSync(isDirectory, { recursive: true });
    }
    cb(null, `public/${req.fileUploadPath}`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

// ? ************************************* filter the Files ******************************** */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.match(/^application/) ||
    file.mimetype.match(/^image/) ||
    file.mimetype.match(/^video/)
  ) {
    return cb(null, true);
  }
  req.fileValidationError = "Please choose only .pdf, .doc, .docx";
  return cb(null, false, req.fileValidationError);
};

// ? ************************************* upload the File to the server ******************************** */
exports.uploadFile = (fileName, length = 3, isMultiple = false) => {
  const uploading = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10485760,
    },
  });

  return !isMultiple
    ? uploading.single(fileName)
    : uploading.array(fileName, length);
};

// ? ************************************* Delete the file from the server ******************************** */
exports.deleteFile = (filename, UploadedPath) => {
  try {
    const filePath = path.join(`public/${UploadedPath}/${filename}`);
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist. Try again!");
    }
    fs.unlinkSync(filePath);
    return { status: true, message: "File deleted successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
