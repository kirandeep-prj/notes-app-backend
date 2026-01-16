const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 🔐 helper to sign JWT
const signToken = (userId , role) => {
  return jwt.sign(
    { id: userId , role:role },
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
  const token = signToken(user._id,user.role);
  logInfo(`User registered: ${email}`);

  res.status(201).json({
    message: "User registered successfully",
    token
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

  const token = signToken(user._id,user.role);


  logInfo(`User logged in: ${email}`);

  res.json({
    message: "Login successful",
    token
  });
});

//forget password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User with this email does not exist"
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before saving in DB
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // Use PORT from .env
  const PORT = process.env.PORT || 3000;
  const resetURL = `http://localhost:${PORT}/api/users/reset-password/${resetToken}`;

  res.status(200).json({
    status: "success",
    message: "Password reset link generated",
    resetURL
  });
});

//resetPassword

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get token from params
  const { token } = req.params;

  // 2) Hash the token (same way as in forgotPassword)
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 3) Find user with this token and check expiry
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() } // not expired
  });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired"
    });
  }

  // 4) Get new password from body
  const { password } = req.body;

  // ✅ IMPORTANT FIX: Hash the new password before saving
  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  // 5) Remove reset fields
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully"
  });
});