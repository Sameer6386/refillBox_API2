const User = require("../model/User");
const Job = require("../model/job");

exports.approveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "approved";
    await job.save();

    res.status(200).json({ message: "Job approved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error approving job", error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = true;
    await user.save();

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error blocking user", error: error.message });
  }
};
