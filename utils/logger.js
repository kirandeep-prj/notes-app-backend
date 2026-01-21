const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/app.log");

exports.logInfo = message => {
  const time = new Date().toISOString().replace("T", " ").split(".")[0];
  const log = `[INFO] [${time}] ${message}\n`;

  console.log(log.trim());
  fs.appendFileSync(logFile, log);
};

exports.logError = message => {
  const time = new Date().toISOString().replace("T", " ").split(".")[0];
  const log = `[ERROR] [${time}] ${message}\n`;

  console.error(log.trim());
  fs.appendFileSync(logFile, log);
};