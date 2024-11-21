const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileType: { type: String, enum: ["GST", "PAN", "Other"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
