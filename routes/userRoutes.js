const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validate = require("../validators/validate");
const { registerSchema, loginSchema } = require("../validators/user.schema");
const auth = require("../middleware/auth");
const restrictTo = require("../middleware/restrictTo");
const adminController =require("../controllers/adminController");

router.get("/admin/users", auth, restrictTo("admin"), adminController.getAllUsers);
router.delete("/admin/users/:id",auth,restrictTo("admin"),adminController.deleteUser);
router.patch("/admin/users/:id/role",auth,restrictTo("admin"),adminController.updateUserRole);

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password/:token", userController.resetPassword);



module.exports = router;
