const fs = require("fs");
const path = require("path");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// ✅ REGISTER
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const users = getUsers();

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password // plain for now (we’ll hash later)
  };

  users.push(newUser);
  saveUsers(users);

  logInfo(`User registered: ${email}`);

  res.status(201).json({
    message: "User registered successfully"
  });
});

// ✅ LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const users = getUsers();
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  logInfo(`User logged in: ${email}`);

  res.json({
    message: "Login successful",
    userId: user.id
  });
});
