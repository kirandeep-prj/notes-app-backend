const AppError = require("../utils/AppError");

exports.validateCreateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return next(new AppError("Title is required", 400));
  }

  if (!content) {
    return next(new AppError("Content is required", 400));
  }

  if (title.length < 3) {
    return next(new AppError("Title must be at least 3 characters", 400));
  }

  next();
};

exports.validateUpdateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title && !content) {
    return next(
      new AppError("At least title or content is required", 400)
    );
  }

  next();
};
