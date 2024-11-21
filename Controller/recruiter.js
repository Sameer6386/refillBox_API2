const Recruiter = require("../model/Recruiter");
const Job = require("../model/job");
const {
  validateData,
  recruiterValidationSchema,
  jobValidationSchema,
} = require("../Utils/validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Recruiter Registration
exports.registerRecruiter = async (req, res) => {
  try {
    validateData(recruiterValidationSchema, req.body);

    const { name, email, password, company, phone } = req.body;

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      name,
      email,
      password: hashedPassword,
      company,
      phone,
    });

    await newRecruiter.save();

    res.status(201).json({
      message: "Recruiter registered successfully",
      recruiter: newRecruiter,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Recruiter Login
exports.loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: recruiter._id, role: "Recruiter" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recruiter Posting Job
exports.postJob = async (req, res) => {
  try {
    validateData(jobValidationSchema, req.body);

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

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Candidates Who Applied for a Job
exports.getJobCandidates = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate(
      "applicants",
      "name email skills"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ candidates: job.applicants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recruiter Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    const totalJobs = jobs.length;
    const totalApplications = jobs.reduce(
      (acc, job) => acc + job.applicants.length,
      0
    );

    res.status(200).json({ totalJobs, totalApplications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
