/**
 * User Routes
 * Defines API endpoints for user CRUD operations
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

// GET /users - Return all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Return a user by ID
router.get('/:id', userController.getUserById);

// POST /users - Create a new user (with validation)
router.post('/', validateUser, userController.createUser);

// PUT /users/:id - Update an existing user (with validation)
router.put('/:id', validateUser, userController.updateUser);

// DELETE /users/:id - Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
