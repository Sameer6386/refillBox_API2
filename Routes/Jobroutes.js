const Job = require("../model/job");

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
