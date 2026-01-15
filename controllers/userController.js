const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 helper to sign JWT
const signToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "6d" }
  );
};

// ✅ REGISTER
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  logInfo(`User registered: ${email}`);

  res.status(201).json({
    message: "User registered successfully"
  });
});

// ✅ LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }
  console.log("role", user.role)
  const token = jwt.sign(
  { id: user._id, role: user.role },  // <-- IMPORTANT
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


  logInfo(`User logged in: ${email}`);

  res.json({
    message: "Login successful",
    token
  });
});
