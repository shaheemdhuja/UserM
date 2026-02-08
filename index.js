/**
 * User Management REST API
 * Main server entry point
 */

const express = require('express');
const logger = require('./middleware/logger');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(logger);          // Log all requests (method + URL)

// Routes
app.use('/users', userRoutes);

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'User Management API',
    version: '1.0.0',
    endpoints: {
      users: '/users',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
