const express = require("express");
const { authenticateUser } = require("../Middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  googleLogin,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} = require("../Controller/UserController");

const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/google-login", googleLogin);

router.get("/profile", authenticateUser, getUserProfile);

router.put("/profile", authenticateUser, updateUserProfile);

router.post("/profile/upload", authenticateUser, uploadProfilePicture);

module.exports = router;
