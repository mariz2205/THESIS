const db = require('../config/database');

async function createNotification(userId, message) {
  try {
    await db.query(`
      INSERT INTO notifications
      (user_id, message)
      VALUES (?, ?)
    `, [userId, message]);
  } catch (error) {
    console.error('createNotification error:', error);
  }
}

module.exports = {
  createNotification
};