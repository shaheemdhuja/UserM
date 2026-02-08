/**
 * User Controller
 * Handles business logic for user CRUD operations
 * Uses in-memory array for data storage (no database)
 */

// In-memory storage for users
let users = [];
let nextId = 1;

/**
 * Get all users
 */
const getAllUsers = (req, res) => {
  res.json(users);
};

/**
 * Get a single user by ID
 * Returns 404 if user not found
 */
const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'User ID must be a valid number'
    });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: 'Not found',
      message: `User with ID ${id} not found`
    });
  }

  res.json(user);
};

/**
 * Create a new user
 * Validation middleware ensures name and email are valid
 */
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Check for duplicate email
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'User with this email already exists'
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

/**
 * Update an existing user
 * Returns 404 if user not found
 */
const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'User ID must be a valid number'
    });
  }

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      error: 'Not found',
      message: `User with ID ${id} not found`
    });
  }

  const { name, email } = req.body;

  // Check for duplicate email (excluding current user)
  const existingUser = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.id !== id
  );
  if (existingUser) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'User with this email already exists'
    });
  }

  users[userIndex] = {
    id: users[userIndex].id,
    name,
    email
  };

  res.json(users[userIndex]);
};

/**
 * Delete a user
 * Returns 404 if user not found
 */
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'User ID must be a valid number'
    });
  }

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      error: 'Not found',
      message: `User with ID ${id} not found`
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.status(200).json({
    message: 'User deleted successfully',
    user: deletedUser
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
