const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/notes.json");

// Read notes
function getAllNotes() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Save notes
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

module.exports = {
  getAllNotes,
  saveNotes
};
