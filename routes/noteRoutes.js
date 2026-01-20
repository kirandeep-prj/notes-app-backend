const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");
const validate = require("../validators/validate");
const restrictTo = require("../middleware/restrictTo");
const adminController =require("../controllers/adminController");


const {
  createNoteSchema,
  updateNoteSchema
} = require("../validators/note.schema");

router.get("/admin/all", auth, restrictTo("admin"),adminController.getAllNotesForAdmin);
router.get("/admin/shared-map",auth,restrictTo("admin"),adminController.adminSharedNotesMap);
router.delete("/admin/:id", auth, restrictTo("admin"), adminController.adminDeleteNote);
router.put("/admin/:id", auth, restrictTo("admin"), adminController.updateNoteByAdmin);
router.get("/admin/:id", auth, restrictTo("admin"), adminController.adminGetSingleNote);
router.get("/admin/user/:userId/notes",auth,restrictTo("admin"),adminController.adminGetNotesByUser);

router.get("/", auth, noteController.getNotes);
router.get("/shared/by-me", auth, noteController.getNotesSharedByMe);
router.get("/shared", auth, noteController.getNotesSharedWithMe);

router.post("/", auth, validate(createNoteSchema), noteController.createNote);
router.post("/:id/share", auth, noteController.shareNote);
router.put("/:id", auth, validate(updateNoteSchema), noteController.updateNote);
router.patch("/:id/pin", auth, noteController.togglePinNote);
router.delete("/:id", auth, noteController.deleteNote);


module.exports = router;
