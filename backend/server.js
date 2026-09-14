const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/user-routes');
const reportRoutes = require('./src/routes/report-routes');
const activityLogRoutes = require('./src/routes/activity-log-routes');
const notificationRoutes = require('./src/routes/notification-routes');
const authRoutes = require('./src/routes/auth-routes');

const { authenticateToken } = require('./src/middleware/auth-middleware');
const { authorizeRoles } = require('./src/middleware/role-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Angat Emergency Response API is running'
  });
});

app.get(
  '/api/protected-test',
  authenticateToken,
  authorizeRoles('Admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'You are an authorized Admin!',
      user: req.user
    });
  }
);

// API ROUTES
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});