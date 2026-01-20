const Note = require("../models/Note");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logInfo } = require("../utils/logger");

// ONLY ADMIN CAN ACCESS THIS
exports.getAllNotesForAdmin = catchAsync(async (req, res, next) => {
  const notes = await Note.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// ADMIN CAN DELETE ANY NOTE
exports.adminDeleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  await note.deleteOne();
  
  logInfo(`Admin deleted note: ${note._id}`);

  res.status(200).json({
    status: "success",
    message: "Note deleted by admin",
  });
});


// ADMIN UPDATE NOTE (separate API)
exports.updateNoteByAdmin = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  // Admin can update ANY note — no ownership check needed
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  note.pinned = req.body.pinned !== undefined ? req.body.pinned : note.pinned;
  note.tags = req.body.tags || note.tags;
  note.reminderAt = req.body.reminderAt || note.reminderAt;

  await note.save();

  logInfo(`Admin updated note: ${note._id}`);

  res.json({
    status: "success",
    message: "Note updated by admin",
    note
  });
});

// ADMIN: GET SINGLE NOTE
exports.adminGetSingleNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id)
    .populate("user", "name email")
    .populate("sharedWith.user", "name email");

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  res.status(200).json({
    status: "success",
    note,
  });
});

// ADMIN: VIEW SHARED NOTES MAP
exports.adminSharedNotesMap = catchAsync(async (req, res, next) => {
  const notes = await Note.find({
    "sharedWith.0": { $exists: true } // only notes that are shared
  })
    .populate("user", "name email") // note owner
    .populate("sharedWith.user", "name email"); // shared users

  const result = notes.map(note => ({
    noteId: note._id,
    title: note.title,
    owner: note.user,
    sharedWith: note.sharedWith.map(s => ({
      user: s.user,
      canEdit: s.canEdit
    }))
  }));

  res.status(200).json({
    status: "success",
    results: result.length,
    data: result
  });
});

// ADMIN CAN GET ALL NOTES OF A SPECIFIC USER
exports.adminGetNotesByUser = catchAsync(async (req, res, next) => {
  const notes = await Note.find({ user: req.params.userId })
    .populate("user", "name email");

  if (!notes.length) {
    return next(new AppError("No notes found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: notes.length,
    notes,
  });
});

//------------------User-----------
//ADMIN CAN SEE THE LIST OF USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("name email role createdAt");

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

//ADMIN CAN UPDATE USER ROLE (MAKE USER -> ADMIN)
exports.updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;

  if (!role) {
    return next(new AppError("Role is required", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  ).select("name email role");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

//ADMIN : DELETE A USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});


