const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");

const {
  validateCreateNote,
  validateUpdateNote
} = require("../validators/noteValidator");

router.get("/", auth, noteController.getNotes);
router.post("/", auth, validateCreateNote, noteController.createNote);
router.put("/:id", auth, validateUpdateNote, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;
