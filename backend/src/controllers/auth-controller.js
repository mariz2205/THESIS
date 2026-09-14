const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const [rows] = await db.query(`
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        status
      FROM users
      WHERE email = ?
    `, [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    // Check account status
    if (user.status !== 'Active') {
      return res.status(403).json({
        success: false,
        message: 'This account is inactive'
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Make sure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing from .env');

      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration is missing'
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );

    // Do not send password_hash to frontend
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token
    });

  } catch (error) {
    console.error('login error:', error);

    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
}

module.exports = {
  login
};