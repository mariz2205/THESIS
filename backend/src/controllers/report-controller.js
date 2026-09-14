const db = require('../config/database');

// GET ALL REPORTS
async function getReports(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT
        r.id,
        r.title,
        r.type,
        r.barangay,
        u.name AS createdBy,
        r.date_created AS dateCreated,
        r.status,
        r.content
      FROM reports r
      LEFT JOIN users u ON u.id = r.created_by
      ORDER BY r.date_created DESC, r.id DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('getReports error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
}


// GET REPORT BY ID
async function getReportById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.query(`
      SELECT
        r.id,
        r.title,
        r.type,
        r.barangay,
        u.name AS createdBy,
        r.date_created AS dateCreated,
        r.status,
        r.content
      FROM reports r
      LEFT JOIN users u ON u.id = r.created_by
      WHERE r.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('getReportById error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch report'
    });
  }
}


module.exports = {
  getReports,
  getReportById
};