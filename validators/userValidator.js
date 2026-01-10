const AppError = require("../utils/AppError");

exports.validateRegisterUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError("Name, email and password are required", 400)
    );
  }

  if (!email.includes("@")) {
    return next(new AppError("Invalid email format", 400));
  }

  if (password.length < 4) {
    return next(
      new AppError("Password must be at least 4 characters", 400)
    );
  }

  next();
};

exports.validateLoginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Email and password are required", 400)
    );
  }

  next();
};
