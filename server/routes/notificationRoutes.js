import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getNotifications, markNotificationsRead } from '../controllers/notificationControllers.js';

const router = express.Router();

router.get('/getNotifications', verifyToken, getNotifications);
router.post('/markNotificationsRead', verifyToken, markNotificationsRead);

export default router;