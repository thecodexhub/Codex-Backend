const path = require("path");
const fs = require("fs");

// Multer config
const multer = require("multer");
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single("file");

// Upload handler
exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const filePath = `/uploads/${req.file.filename}`; // Relative path for FE
    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: filePath
    });
  });
};
