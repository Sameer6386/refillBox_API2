const Notification = require("../model/Notification");
const { sendEmail } = require("../Utils/sendEmail");

exports.createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = new Notification({ user: userId, message });
    await notification.save();

    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating notification", error: error.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating notification", error: error.message });
  }
};
