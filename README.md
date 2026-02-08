# User Management REST API

A complete REST API for managing users with full CRUD (Create, Read, Update, Delete) operations. Built with Node.js and Express, featuring request logging, input validation, and proper error handling.

## Project Overview

This API provides endpoints to manage a collection of users stored in memory. It demonstrates a modular Express application structure with separate routes, controllers, and middleware. No database is required—users are stored in an in-memory array, making it ideal for development, testing, or prototyping.

## Technologies Used

- **Node.js** – Runtime environment
- **Express** – Web framework for building the REST API
- **JSON** – Data format for request/response bodies

## Project Structure

```
UserM/
├── index.js                 # Main server entry point
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
├── controllers/
│   └── userController.js    # Business logic for user operations
├── middleware/
│   ├── logger.js            # Request logging middleware
│   └── validateUser.js      # User input validation middleware
└── routes/
    └── users.js             # User API routes
```

## API Endpoints

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | /users          | Get all users                  |
| GET    | /users/:id      | Get a user by ID               |
| POST   | /users          | Create a new user              |
| PUT    | /users/:id      | Update an existing user        |
| DELETE | /users/:id      | Delete a user                  |

### Request/Response Examples

**Create a user (POST /users)**
```json
// Request body
{
  "name": "John Doe",
  "email": "john@example.com"
}

// Response (201 Created)
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Update a user (PUT /users/:id)**
```json
// Request body
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## Validation

The API validates user input for POST and PUT requests:

- **Name** – Required, must be a non-empty string (whitespace is trimmed)
- **Email** – Required, must be a valid email format (e.g., `user@domain.com`)

Invalid requests return a **400 Bad Request** status with a JSON error message:

```json
{
  "error": "Validation failed",
  "message": "Email is required and must be a non-empty string"
}
```

The validation middleware uses a regex pattern to ensure the email follows the standard format: `local@domain.extension`.

## Middleware

### Logger Middleware (`middleware/logger.js`)

Logs every incoming request with:
- Timestamp (ISO format)
- HTTP method (GET, POST, PUT, DELETE)
- Request URL

Example output: `[2025-02-08T12:00:00.000Z] GET /users`

### Validation Middleware (`middleware/validateUser.js`)

Applied to POST and PUT routes. Validates:
- Presence of `name` and `email`
- Non-empty values after trimming
- Valid email format

If validation fails, the request is rejected with 400 and the appropriate error message. If validation passes, the request continues to the controller.

## Error Handling

| Status Code | Condition                                      |
|-------------|------------------------------------------------|
| 400         | Invalid input (missing fields, bad email)     |
| 404         | User not found by ID                           |
| 500         | Internal server error (unhandled exceptions)   |

## How to Run the Project

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Access the API**

   - Base URL: `http://localhost:3000`
   - API info: `http://localhost:3000/`
   - Users: `http://localhost:3000/users`

4. **Optional: Custom port**

   Set the `PORT` environment variable:
   ```bash
   PORT=8080 npm start
   ```

### Testing with cURL

```bash
# Get all users
curl http://localhost:3000/users

# Create a user
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"

# Get user by ID
curl http://localhost:3000/users/1

# Update a user
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\"}"

# Delete a user
curl -X DELETE http://localhost:3000/users/1
```

---

**Note:** This project was written, debugged, and enhanced with GitHub Copilot.
