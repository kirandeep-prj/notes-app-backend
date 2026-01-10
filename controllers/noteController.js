const { getAllNotes, saveNotes } = require("../models/noteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { logInfo } = require("../utils/logger");

// GET all notes
exports.getNotes = catchAsync(async (req, res, next) => {
  const notes = getAllNotes();
  res.json(notes);
});

// CREATE note
exports.createNote = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  const notes = getAllNotes();

  const newNote = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date()
  };

  notes.push(newNote);
  saveNotes(notes);

  logInfo(`Note created: ID ${newNote.id}`);

  res.status(201).json(newNote);
});

// UPDATE note
exports.updateNote = catchAsync(async (req, res, next) => {
  const noteId = Number(req.params.id);
  const { title, content } = req.body;

  const notes = getAllNotes();
  const index = notes.findIndex(n => n.id === noteId);

  if (index === -1) {
    return next(new AppError("Note not found", 404));
  }

  if (title) notes[index].title = title;
  if (content) notes[index].content = content;
  notes[index].updatedAt = new Date();

  saveNotes(notes);
  logInfo(`Note updated: ID ${noteId}`);

  res.json(notes[index]);
});

// DELETE note
exports.deleteNote = catchAsync(async (req, res, next) => {
  const noteId = Number(req.params.id);

  const notes = getAllNotes();
  const filteredNotes = notes.filter(n => n.id !== noteId);

  if (notes.length === filteredNotes.length) {
    return next(new AppError("Note not found", 404));
  }

  saveNotes(filteredNotes);
  logInfo(`Note deleted: ID ${noteId}`);

  res.json({ message: "Note deleted successfully" });
});
