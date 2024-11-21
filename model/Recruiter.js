const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    companyDocuments: {
      type: [String], // Array of file URLs for company documents
    },
    isVerified: {
      type: Boolean,
      default: false, // Set to true after admin verification
    },
    role: {
      type: String,
      enum: ["Recruiter", "Admin"],
      default: "Recruiter",
    },
    deviceToken: {
      type: String, // For push notifications
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
