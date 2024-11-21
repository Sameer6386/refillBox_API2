const express = require("express");
const {
  authenticateUser,
  isRecruiter,
} = require("../Middleware/authMiddleware");
const {
  registerRecruiter,
  loginRecruiter,
  postJob,
  getJobCandidates,
  getDashboardStats,
} = require("../controllers/recruiterController");

const router = express.Router();

// Public Routes
router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);

// Protected Routes (Recruiter only)
router.post("/jobs", authenticateUser, isRecruiter, postJob);
router.get(
  "/jobs/:jobId/candidates",
  authenticateUser,
  isRecruiter,
  getJobCandidates
);
router.get("/dashboard", authenticateUser, isRecruiter, getDashboardStats);

module.exports = router;
