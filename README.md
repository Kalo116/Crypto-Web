# Crypto Web Application

A web application designed for managing cryptocurrency data. This project allows users to register, log in, and perform all CRUD (Create, Read, Update, Delete) operations related to cryptocurrency information. The application uses MongoDB for database management and is built with Express.js.

## Features

- User Authentication (Register/Login)
- JWT-based authorization
- Secure password handling using bcrypt
- Full CRUD operations for managing cryptocurrency data
- Template rendering using Express Handlebars
- Cookie-based session management
- Database management with MongoDB

## Technologies Used

The project is built using the following technologies and libraries:

- **bcrypt**: ^5.0.1
  - Used for hashing passwords to ensure secure storage.

- **cookie-parser**: ^1.4.6
  - Parses cookies for managing user sessions.

- **express**: ^4.18.1
  - A web application framework for building the server-side application.

- **express-handlebars**: ^6.0.6
  - Template engine for rendering dynamic pages.

- **jsonwebtoken**: ^8.5.1
  - Used for generating and verifying JSON Web Tokens for secure authentication.

- **mongoose**: ^6.4.0
  - An ODM (Object Data Modeling) library for MongoDB, used to interact with the database.

## Prerequisites

To run this project, ensure you have the following installed:

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-web.git
   ```

2. Navigate to the project directory:
   ```bash
   cd crypto-web
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
crypto-web/
├── public/           # Static assets (CSS, JavaScript, images)
├── routes/           # Route definitions for the app
├── views/            # Handlebars templates
├── models/           # Mongoose schemas
├── controllers/      # Controller logic
├── middleware/       # Custom middleware (e.g., authentication)
├── app.js            # Main entry point of the application
└── package.json      # Project metadata and dependencies
```

## Usage

- **Register**: Create a new account to access the application.
- **Login**: Log in with your credentials to view your dashboard.
- **CRUD Operations**: Perform create, read, update, and delete operations on cryptocurrency data.

## Security

- User passwords are securely hashed using bcrypt.
- JWT is used to authenticate and authorize users.
- Cookies are used for session management.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Author

Developed by Kaloyan Yordano(https://github.com/Kalo116). Feel free to reach out for any queries!
