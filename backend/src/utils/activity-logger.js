const db = require('../config/database');

async function logActivity(userId, action, target) {
  try {
    await db.query(`
      INSERT INTO activity_logs
      (user_id, action, target)
      VALUES (?, ?, ?)
    `, [
      userId,
      action,
      target
    ]);
  } catch (error) {
    console.error('logActivity error:', error);
  }
}

module.exports = {
  logActivity
};