require("dotenv").config();

const express = require("express");
const app = express();

const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


// Body parser (must be before routes)
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Notes API running (clean structure)");
});

// Error handler (ALWAYS LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
