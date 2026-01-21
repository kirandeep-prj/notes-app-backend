# 📒 Notes App -- Backend

### Node.js • Express • Clean Architecture

This project is a **structured backend application** built with
**Node.js and Express**, designed to understand **real‑world backend
development practices** step by step.

The focus of this project is not just building APIs, but learning **how
professional backend systems are structured, validated, logged, and
documented**.

------------------------------------------------------------------------

## 🚀 Features

- User authentication with **JWT**
- Role‑based access control (**Admin / User**)
- Secure password hashing with **bcrypt**
- Password change invalidates old tokens
- CRUD operations for notes
- User profile management
- Input validation using schemas
- Centralized error handling
- Clean folder architecture

------------------------------------------------------------------------

## 🧱 Project Structure

``` bash
notes-app-backend/
│
├── config/
│ └── db.js # MongoDB connection
│
├── models/
│ ├── User.js # User schema & hooks
│ └── Note.js # Note schema
│
├── controllers/
│ ├── adminController.js # Admin-only operations
│ ├── userController.js # Auth / user actions
│ ├── profileController.js # Profile & password management
│ └── noteController.js # Notes CRUD
│
├── middleware/
│ ├── auth.js # JWT authentication
│ ├── restrictTo.js # Role-based access
│ ├── errorHandler.js # Global error handler
│ └── validateNote.js # Note ownership validation
│
├── routes/
│ ├── userRoutes.js
│ ├── profileRoutes.js
│ └── noteRoutes.js
│
├── validators/
│ ├── user.schema.js # User validation schemas
│ ├── note.schema.js # Note validation schemas
│ └── validate.js # Generic validation middleware
│
├── utils/
│ ├── AppError.js # Custom error class
│ └── catchAsync.js # Async error wrapper
│
└── server.js # Server entry point
```

------------------------------------------------------------------------

## 🧠 Architecture Principles

- **Models** → Data & database logic only  
- **Controllers** → Business logic  
- **Middleware** → Request flow & authorization  
- **Validators** → Input validation only  
- **Utils** → Reusable helpers  
- **Routes** → Endpoint definitions only  

This separation ensures:
- Easy debugging
- Better scalability
- Clean codebase

------------------------------------------------------------------------

## 🔐 Authentication Flow

1. User logs in → JWT issued
2. JWT sent in `Authorization` header:
    Bearer <token>
3. `auth` middleware:
- Verifies token
- Checks user existence
- Invalidates token if password was changed
4. `restrictTo` middleware:
- Allows role-based access (e.g. admin only)

---

## 🔁 Password Security

- Passwords are hashed using **bcrypt**
- Password confirmation is never stored
- Password change updates `passwordChangedAt`
- Old JWT tokens become invalid automatically

---

## 🧪 Validation

- Request body validation handled using schemas
- Generic `validate(schema)` middleware
- Clean error responses for invalid input

---

## 🛑 Error Handling

- Centralized global error handler
- Custom `AppError` class for consistent errors
- Async errors handled via `catchAsync`

---

## ⚙️ Environment Variables

Create a `.env` file in the root:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d


---

## ▶️ Running the Project

### Install dependencies
    npm install

### Start development server
    npm run dev

### Start production server
    npm start


---

## 🧩 API Testing

- APIs can be tested using **Swagger**, **Postman**, or **Insomnia**
- Always include `Authorization` header for protected routes

---

## 📌 Status

✅ Backend completed  
✅ Clean architecture  
✅ Production‑ready  
✅ Frontend‑ready  

---

## 👩‍💻 Author

**Kirandeep**  
Backend Developer | MERN Stack

---

## 📄 License

This project is licensed under the MIT License.
