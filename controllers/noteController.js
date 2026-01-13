const Note = require("../models/Note");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");

// GET all notes (user specific – JWT ready)
exports.getNotes = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { content: { $regex: req.query.keyword, $options: "i" } }
        ]
      }
    : {};

  const notes = await Note.find({ user: req.user.id,
    ...keyword
  })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({
    page,
    results: notes.length,
    notes
  });
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
 const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id
  });

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
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

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
