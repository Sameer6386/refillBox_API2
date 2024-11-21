const express = require("express");
const { authenticateUser } = require("../Controller/authController");
const {
  createSubscription,
  getUserSubscription,
  cancelSubscription,
} = require("../Controller/subscription");

const router = express.Router();

router.post("/", authenticateUser, createSubscription);
router.get("/", authenticateUser, getUserSubscription);
router.patch("/:subscriptionId/cancel", authenticateUser, cancelSubscription);

module.exports = router;
