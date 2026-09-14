const db = require('../config/database');

// GET ALL ACTIVITY LOGS
async function getActivityLogs(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT
        al.id,
        u.name AS user,
        al.action,
        al.target,
        al.timestamp
      FROM activity_logs al
      LEFT JOIN users u ON u.id = al.user_id
      ORDER BY al.timestamp DESC, al.id DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('getActivityLogs error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs'
    });
  }
}


// GET ONE ACTIVITY LOG
async function getActivityLogById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.query(`
      SELECT
        al.id,
        u.name AS user,
        al.action,
        al.target,
        al.timestamp
      FROM activity_logs al
      LEFT JOIN users u ON u.id = al.user_id
      WHERE al.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Activity log not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('getActivityLogById error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity log'
    });
  }
}


module.exports = {
  getActivityLogs,
  getActivityLogById
};