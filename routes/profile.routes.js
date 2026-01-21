const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const auth = require("../middleware/auth");
const { updatePasswordSchema } = require("../validators/user.schema");
const validate = require("../validators/validate");



router.get("/me", auth, profileController.getMe);
router.put("/me", auth, profileController.updateMe);
router.put("/me/password", auth,validate(updatePasswordSchema), profileController.updateMyPassword);
router.post("/logout", profileController.logout);




module.exports = router;
