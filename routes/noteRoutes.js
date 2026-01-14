const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");
const validate = require("../validators/validate");
const {
  createNoteSchema,
  updateNoteSchema
} = require("../validators/note.schema");

router.get("/", auth, noteController.getNotes);
router.post("/", auth, validate(createNoteSchema), noteController.createNote);
router.put("/:id", auth, validate(updateNoteSchema), noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;
