const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const auth = catchAsync(async (req, res, next) => {
  let token;

  // 1️⃣ Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // 2️⃣ Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3️⃣ Check if user still exists
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  // 4️⃣ Check if password changed after token issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password recently changed. Please login again.", 401)
    );
  }

  // 5️⃣ Attach user to request
  req.user = {
    id: user._id,
    role: user.role
  };

  next();
});

module.exports = auth;
