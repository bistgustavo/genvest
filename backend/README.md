# Genvest Ventures Backend

This is the backend server for Genvest Ventures, providing API endpoints for the frontend application. The server handles user authentication, financial data management, and other core business functionalities.

## Technologies Used

- Node.js/Express.js
- MongoDB (Database)
- JWT for authentication
- Express Validator for request validation
- Mongoose ODM
- Nodemailer for email services

## Prerequisites

- Node.js (v16.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm (v7.0.0 or higher)

## Getting Started

1. Clone the repository

```bash
git clone [repository-url]
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```bash
PORT=8000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Start the development server

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

## API Documentation

### Authentication Endpoints

- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - User login
- POST `/api/users/forgot-password` - Password reset request
- POST `/api/users/reset-password` - Reset password

### User Endpoints

- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- PUT `/api/users/change-password` - Change password

## Project Structure

```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── app.js         # Express app setup
├── tests/            # Test files
└── server.js         # Entry point
```

## Error Handling

The API uses a centralized error handling mechanism. All errors are formatted as:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Data Models

### User Model

- email
- password (hashed)
- name
- role
- profile
- createdAt
- updatedAt

### Market Data Model

- symbol
- price
- volume
- timestamp
- indicators

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Genvest Ventures Pvt. Ltd.
