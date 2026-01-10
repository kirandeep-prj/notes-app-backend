// validateNote.js
function validateNote(req, res, next) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  next(); // data is valid → continue to controller
}

module.exports = validateNote;
