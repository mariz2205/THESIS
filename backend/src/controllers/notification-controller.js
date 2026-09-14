const db = require('../config/database');

// GET NOTIFICATIONS FOR LOGGED-IN USER
async function getNotifications(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(`
      SELECT
        n.id,
        n.user_id,
        n.message,
        n.\`read\`,
        n.created_at
      FROM notifications n
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC, n.id DESC
    `, [userId]);

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('getNotifications error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
}


// GET NOTIFICATION BY ID
async function getNotificationById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [rows] = await db.query(`
      SELECT
        n.id,
        n.user_id,
        n.message,
        n.\`read\`,
        n.created_at
      FROM notifications n
      WHERE n.id = ?
        AND n.user_id = ?
    `, [id, userId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('getNotificationById error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification'
    });
  }
}


// MARK NOTIFICATION AS READ
async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await db.query(`
      UPDATE notifications
      SET \`read\` = TRUE
      WHERE id = ?
        AND user_id = ?
    `, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('markAsRead error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
}


module.exports = {
  getNotifications,
  getNotificationById,
  markAsRead
};