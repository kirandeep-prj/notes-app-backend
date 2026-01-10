const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

const {
  validateCreateNote,
  validateUpdateNote
} = require("../validators/noteValidator");

router.get("/", noteController.getNotes);

router.post(
  "/",
  validateCreateNote,
  noteController.createNote
);

router.put(
  "/:id",
  validateUpdateNote,
  noteController.updateNote
);

router.delete(
  "/:id",
  noteController.deleteNote
);

module.exports = router;
