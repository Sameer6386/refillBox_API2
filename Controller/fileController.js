const File = require("../model/file");
const { uploadFile } = require("../Utils/fileUtils");

exports.uploadFile = async (req, res) => {
  try {
    const { fileType } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const uploadedFile = await uploadFile(req.file);

    const fileData = new File({
      filename: uploadedFile.filename,
      filepath: uploadedFile.filepath,
      uploadedBy: req.user.id,
      fileType,
    });

    await fileData.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully", file: fileData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};
