const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// GET MY PROFILE
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select(
    "name email role createdAt"
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

// UPDATE MY PROFILE
exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    {
      new: true,
      runValidators: true
    }
  ).select("name email role createdAt");

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

// UPDATE MY PASSWORD
exports.updateMyPassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword, passwordConfirm } = req.body;


  // 1️⃣ Get user with password (VERY IMPORTANT because select: false)
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // 2️⃣ Check if current password is correct
  const isCorrect = await user.correctPassword(
    currentPassword,
    user.password
  );
  if (!isCorrect) {
    return next(new AppError("Current password is incorrect", 401));
  }

  // 3️⃣ Update password
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;

  await user.save(); // 👉 this will trigger your pre-save hook (bcrypt hashing)
  res.status(200).json({
    status: "success",
    message: "Password updated successfully"
  });
});

// LOGOUT USER
exports.logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};


