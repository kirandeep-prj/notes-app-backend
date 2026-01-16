const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validate = require("../validators/validate");
const { registerSchema, loginSchema } = require("../validators/user.schema");

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password/:token", userController.resetPassword);



module.exports = router;
