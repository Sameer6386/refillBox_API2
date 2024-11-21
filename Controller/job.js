const User = require("../model/User");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, description, requirements, location, salary, vacancies } =
      req.body;

    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      salary,
      vacancies,
      postedBy: req.user.id,
    });

    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { title, location, salaryRange } = req.query;

    const filters = {};
    if (title) filters.title = { $regex: title, $options: "i" };
    if (location) filters.location = { $regex: location, $options: "i" };
    if (salaryRange) {
      const [min, max] = salaryRange.split("-");
      filters.salary = { $gte: Number(min), $lte: Number(max) };
    }

    const jobs = await Job.find(filters).populate("postedBy", "name email");

    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job details", error: error.message });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;
    Object.assign(job, updates);

    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.remove();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};
const User = require("../models/User");

exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    job.applicants.push(req.user.id);
    await job.save();

    const user = await User.findById(req.user.id);
    user.appliedJobs.push(job._id);
    await user.save();

    res.status(200).json({ message: "Job application submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error applying for job", error: error.message });
  }
};
exports.getAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("appliedJobs");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.appliedJobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applied jobs", error: error.message });
  }
};
