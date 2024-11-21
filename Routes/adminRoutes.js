const express = require("express");
const { approveJob, blockUser } = require("../Controller/adminController");
const { authenticateAdmin } = require("../Middleware/authMiddleware");

const router = express.Router();

router.patch("/jobs/:jobId/approve", authenticateAdmin, approveJob);
router.patch("/users/:userId/block", authenticateAdmin, blockUser);

module.exports = router;
