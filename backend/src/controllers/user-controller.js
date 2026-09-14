const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { logActivity } = require('../utils/activity-logger');
const { createNotification } = require('../utils/notification-helper');

// GET ALL USERS
async function getUsers(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        name,
        email,
        role,
        status,
        created_at,
        updated_at
      FROM users
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('getUsers error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
}


// GET USER BY ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.query(`
      SELECT
        id,
        name,
        email,
        role,
        status,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('getUserById error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
}


// CREATE USER
async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password,
      role,
      status
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and role are required'
      });
    }

    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(`
      INSERT INTO users
      (name, email, password_hash, role, status)
      VALUES (?, ?, ?, ?, ?)
    `, [
      name,
      email,
      passwordHash,
      role,
      status || 'Active'
    ]);

        await logActivity(
          req.user.id,
          'Created',
          `User: ${name}`
        );

        await createNotification(
          req.user.id,
          `User account "${name}" was created successfully.`
        );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: result.insertId,
        name,
        email,
        role,
        status: status || 'Active'
      }
    });

  } catch (error) {
    console.error('createUser error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
}


// UPDATE USER
async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      role,
      status
    } = req.body;

    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!name || !email || !role || !status) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, role, and status are required'
      });
    }

    const [duplicateEmail] = await db.query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, id]
    );

    if (duplicateEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email is already used by another user'
      });
    }

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);

      await db.query(`
        UPDATE users
        SET
          name = ?,
          email = ?,
          password_hash = ?,
          role = ?,
          status = ?
        WHERE id = ?
      `, [
        name,
        email,
        passwordHash,
        role,
        status,
        id
      ]);

    } else {
      await db.query(`
        UPDATE users
        SET
          name = ?,
          email = ?,
          role = ?,
          status = ?
        WHERE id = ?
      `, [
        name,
        email,
        role,
        status,
        id
      ]);
    }

    await logActivity(
      req.user.id,
      'Updated',
      `User: ${name}`
    );

    await createNotification(
      req.user.id,
      `User account "${name}" was updated successfully.`
    );

    res.json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('updateUser error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
}


// DELETE USER
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const [existingUsers] = await db.query(
      'SELECT id, name FROM users WHERE id = ?',
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

        await db.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    await logActivity(
      req.user.id,
      'Deleted',
      `User: ${existingUsers[0].name}`
    );

    await createNotification(
      req.user.id,
      `User account "${existingUsers[0].name}" was deleted successfully.`
    );

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('deleteUser error:', error);

    // Handles users referenced by reports
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        success: false,
        message: 'Cannot delete this user because they are associated with existing reports'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};