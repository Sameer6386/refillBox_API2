const express = require("express");
const { uploadFile } = require("../Controller/fileController");
const { validateFile } = require("../Validators/fileValidator");
const { authenticateUser } = require("../Middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/upload",
  authenticateUser,
  upload.single("file"),
  validateFile,
  uploadFile
);

module.exports = router;
