const { logError } = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logError(`${req.method} ${req.originalUrl} → ${err.message}`);

  res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message
  });
};
