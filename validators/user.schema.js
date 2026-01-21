const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

exports.loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required")
});
exports.updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
  passwordConfirm: z.string()
}).refine(data => data.newPassword === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"]
});

