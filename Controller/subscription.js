const Subscription = require("../model/subscription");

exports.createSubscription = async (req, res) => {
  try {
    const { userId, plan, endDate } = req.body;

    const subscription = new Subscription({ user: userId, plan, endDate });
    await subscription.save();

    res.status(201).json({ message: "Subscription created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating subscription", error: error.message });
  }
};

exports.getUserSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({
      user: userId,
      status: "active",
    });
    if (!subscription)
      return res.status(404).json({ message: "No active subscription found" });

    res.status(200).json(subscription);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subscription", error: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error cancelling subscription", error: error.message });
  }
};
