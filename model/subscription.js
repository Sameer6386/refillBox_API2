const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: {
    type: String,
    enum: ["basic", "premium", "pro"],
    required: true,
  },
  status: { type: String, enum: ["active", "cancelled"], default: "active" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
