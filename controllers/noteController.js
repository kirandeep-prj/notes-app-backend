const Note = require("../models/Note");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");

// GET all notes (user specific – JWT ready)
exports.getNotes = catchAsync(async (req, res, next) => {
  //paggination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  
  const skip = (page - 1) * limit;
  //search
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { content: { $regex: req.query.keyword, $options: "i" } },
          { tags: { $regex: req.query.keyword, $options: "i" } }
        ]
      }
    : {};


  // Filter by pinned notes (optional)
  const pinnedFilter =
  req.query.isPinned === "true" ? { pinned: true } : {};

  // Sorting
  const sortField = req.query.sort || "createdAt";
  const sortOrder = req.query.order === "asc" ? 1 : -1;

  const notes = await Note.find({ user: req.user.id,
    ...keyword,
    ...pinnedFilter
  })
  .collation({ locale: "en", strength: 2 }) 
  .sort({[sortField]: sortOrder})
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    results: notes.length,
    notes
  });
});


// CREATE note
exports.createNote = catchAsync(async (req, res, next) => {
  const {  title, content, tags, reminderAt, pinned } = req.body;

  const note = await Note.create({
    title,
    content,
    user: req.user.id,
    tags: tags || [],
    reminderAt: reminderAt || null,
    pinned: pinned || false,
  });

  logInfo(`Note created: ${note._id}`);

  res.status(201).json(note);
});

// UPDATE note
exports.updateNote = catchAsync(async (req, res, next) => {
 // Find note (allow owner OR shared-with users)
   const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // ownership check
 // Check if user is OWNER
const isOwner = note.user.toString() === req.user.id;

// Check if note is shared with this user with edit permission
const sharedAccess = note.sharedWith.find(
  s => s.user.toString() === String(req.user.id || req.user._id) && s.canEdit === true
);

if (!isOwner && !sharedAccess) {
  return next(new AppError("Not authorized to edit this note", 403));
}

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  note.pinned = req.body.pinned !== undefined ? req.body.pinned : note.pinned;
  note.tags = req.body.tags || note.tags;
  note.reminderAt = req.body.reminderAt || note.reminderAt;

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


//share notes 
exports.shareNote = catchAsync(async (req, res, next) => {
  const { userId, canEdit} = req.body; // ID of user to share with

  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // Avoid duplicate sharing
  const alreadyShared = note.sharedWith.some(
    (s) => s.user.toString() === userId
  );

  if (alreadyShared) {
    return next(new AppError("Note already shared", 400));
  }

  if (!alreadyShared) {
    note.sharedWith.push({
      user: userId,
     canEdit: canEdit ?? false,
    });
  }

  await note.save();

  res.status(200).json({
    status: "success",
    message: "Note shared successfully",
    note,
  });
});


//togglepinned notes
exports.togglePinNote = catchAsync(async (req, res, next) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // Toggle pin status
  note.pinned = !note.pinned;
  await note.save();

  res.status(200).json({
    status: "success",
    pinned: note.pinned,
  });
});

// GET NOTES I HAVE SHARED WITH OTHERS
exports.getNotesSharedByMe = catchAsync(async (req, res, next) => {
  const notes = await Note.find({
    user: req.user.id,
    "sharedWith.0": { $exists: true } // means sharedWith array is not empty
  }).populate("sharedWith.user", "name email");

  res.status(200).json({
    status: "success",
    results: notes.length,
    notes,
  });
});

// GET NOTES SHARED WITH ME
exports.getNotesSharedWithMe = catchAsync(async (req, res, next) => {
  const notes = await Note.find({
    "sharedWith.user": req.user.id
  }).populate("user", "name email");

  res.status(200).json({
    status: "success",
    results: notes.length,
    notes,
  });
});



