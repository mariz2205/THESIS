const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user-controller');

const { authenticateToken } = require('../middleware/auth-middleware');
const { authorizeRoles } = require('../middleware/role-middleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRoles('Admin'),
  getUsers
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('Admin'),
  getUserById
);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('Admin'),
  createUser
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('Admin'),
  updateUser
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('Admin'),
  deleteUser
);

module.exports = router;