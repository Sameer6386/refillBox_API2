const express = require("express");
const { authenticateUser } = require("../Middleware/authMiddleware");
const {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} = require("../Controller/notification");

const router = express.Router();

router.post("/", authenticateUser, createNotification);
router.get("/", authenticateUser, getUserNotifications);
router.patch("/:notificationId/read", authenticateUser, markNotificationAsRead);

module.exports = router;
