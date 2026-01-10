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

-   RESTful APIs for Notes and Users
-   Clean and scalable folder structure (MVC pattern)
-   Middleware‑based request validation
-   Centralized error handling
-   Custom logger (console + file logging)
-   Swagger API documentation
-   File‑based data storage using JSON
-   Maintainable and production‑style backend flow

------------------------------------------------------------------------

## 🧱 Project Structure

``` bash
backend/
│
├── config/
│ └── swagger.js
│
├── controllers/
│ ├── noteController.js
│ └── userController.js
│
├── routes/
│ ├── noteRoutes.js
│ └── userRoutes.js
│
├── validators/
│ ├── noteValidator.js
│ └── userValidator.js
│
├── middleware/
│ └── logger.js
│
├── utils/
│ ├── AppError.js
│ ├── catchAsync.js
│ └── logger.js
│
├── data/
│ ├── notes.json
│ └── users.json
│
├── server.js
└── README.md
```

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Node.js
-   Express.js
-   Swagger
-   Postman
-   File System (fs)

------------------------------------------------------------------------

## ⚙️ Running the Project Locally

### Install dependencies

    npm install

### Start the server

    npm start

Server runs at: http://localhost:3000

------------------------------------------------------------------------

## 📘 API Documentation

Swagger UI: http://localhost:3000/api-docs

------------------------------------------------------------------------

## 📌 API Endpoints

### Notes

GET /notes\
POST /notes\
PUT /notes/:id\
DELETE /notes/:id

### Users

POST /users/register\
POST /users/login

------------------------------------------------------------------------

## 🎯 Learning Objective

This project helps understand: - Backend architecture - Middleware
flow - Error handling - Logging - API documentation

