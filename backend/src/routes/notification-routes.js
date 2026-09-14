const express = require('express');

const {
  getNotifications,
  getNotificationById,
  markAsRead
} = require('../controllers/notification-controller');

const { authenticateToken } = require('../middleware/auth-middleware');

const router = express.Router();

// Notifications — authenticated users only
router.get(
  '/',
  authenticateToken,
  getNotifications
);

router.get(
  '/:id',
  authenticateToken,
  getNotificationById
);

router.put(
  '/:id/read',
  authenticateToken,
  markAsRead
);

module.exports = router;