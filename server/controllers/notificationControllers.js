import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
    try {
      const notifications = await Notification.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .populate('adId', 'content topics');
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
};

export const markNotificationsRead = async (req, res, next) => {
    try {
      await Notification.updateMany(
        { userId: req.user.userId, isRead: false },
        { $set: { isRead: true } }
      );
  
      res.status(200).json('Notifications marked as read');
    } catch (error) {
      next(error);
    }
};