const { z } = require("zod");

exports.createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required")
});

exports.updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional()
});
