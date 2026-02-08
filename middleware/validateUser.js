/**
 * User Validation Middleware
 * Validates that name and email are provided and email format is valid
 * Returns 400 with error message for invalid requests
 */

// Simple email regex for basic format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  // Check if name is provided
  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Name is required and must be a non-empty string'
    });
  }

  // Trim and validate name is not empty
  const trimmedName = name.trim();
  if (!trimmedName) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Name cannot be empty'
    });
  }

  // Check if email is provided
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Email is required and must be a non-empty string'
    });
  }

  // Validate email format
  const trimmedEmail = email.trim();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid email format'
    });
  }

  // Store trimmed values for use in controller
  req.body.name = trimmedName;
  req.body.email = trimmedEmail;

  next();
};

module.exports = validateUser;
