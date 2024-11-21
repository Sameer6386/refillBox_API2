require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB } = require("./Database/db");

const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/UserRoutes");
const jobRoutes = require("./Routes/Jobroutes");
const notificationRoutes = require("./Routes/Notification");
const adminRoutes = require("./Routes/adminRoutes");
const fileRoutes = require("./Routes/fileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
