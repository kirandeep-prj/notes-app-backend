const Note = require("../models/Note");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");

// GET all notes (user specific – JWT ready)
exports.getNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// CREATE note
exports.createNote = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    user: req.user.id
  });

  logInfo(`Note created: ${note._id}`);

  res.status(201).json(note);
});

// UPDATE note
exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // ownership check
  if (note.user.toString() !== req.user.id) {
    return next(new AppError("Not authorized", 403));
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  await note.save();

  logInfo(`Note updated: ${note._id}`);

  res.json(note);
});

// DELETE note
exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  if (note.user.toString() !== req.user.id) {
    return next(new AppError("Not authorized", 403));
  }

  await note.deleteOne();

  logInfo(`Note deleted: ${note._id}`);

  res.json({ message: "Note deleted successfully" });
});
