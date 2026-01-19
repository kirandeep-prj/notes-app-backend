const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },

    content: {
      type: String,
      required: [true, "Content is required"]
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pinned: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String], // array of strings
      default: [],
    },

    reminderAt: {
      type: Date,
    },

    sharedWith: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        canEdit: { type: Boolean, default: false }
      }
    ],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);
