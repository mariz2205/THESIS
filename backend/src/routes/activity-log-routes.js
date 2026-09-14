const express = require('express');

const {
  getActivityLogs,
  getActivityLogById
} = require('../controllers/activity-log-controller');

const { authenticateToken } = require('../middleware/auth-middleware');
const { authorizeRoles } = require('../middleware/role-middleware');

const router = express.Router();

// Activity Logs — Admin only
router.get(
  '/',
  authenticateToken,
  authorizeRoles('Admin'),
  getActivityLogs
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('Admin'),
  getActivityLogById
);

module.exports = router;