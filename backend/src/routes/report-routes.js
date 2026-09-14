const express = require('express');

const {
  getReports,
  getReportById
} = require('../controllers/report-controller');

const { authenticateToken } = require('../middleware/auth-middleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  getReports
);

router.get(
  '/:id',
  authenticateToken,
  getReportById
);

module.exports = router;