require("dotenv").config();

const express = require("express");
const app = express();

const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");

// 🔗 Connect DB BEFORE server starts
connectDB();

// Body parser
app.use(express.json());

// Swagger (BEFORE routes & error handler)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes (match Swagger paths)
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Notes API running (clean structure)");
});

// Global error handler (ALWAYS LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
