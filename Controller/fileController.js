const File = require("../model/file");
const { uploadFile } = require("../Utils/fileUtils");
const { validateFile } = require("../Validators/fileValidator");

exports.uploadFile = async (req, res) => {
  try {
    const { fileType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate file before uploading
    const validation = validateFile(req.file);
    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, message: validation.message });
    }

    // Upload the file using utility function
    const uploadedFile = await uploadFile(req.file);

    // Save file metadata in the database
    const fileData = new File({
      filename: uploadedFile.filename,
      filepath: uploadedFile.filepath,
      uploadedBy: req.user.id,
      fileType,
    });

    await fileData.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
};
