const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const {
  validateRegisterUser,
  validateLoginUser
} = require("../validators/userValidator");

router.post(
  "/register",
 validateRegisterUser,
  userController.register
);

router.post(
  "/login",
  validateLoginUser,
  userController.login
);

module.exports = router;
