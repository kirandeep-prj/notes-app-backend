
/**
 * @swagger
 * /api/notes/admin/all:
 *   get:
 *     summary: Get all notes (Admin only)
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all notes (Admin access)
 *       403:
 *         description: Forbidden - not an admin
 */
/**
 * @swagger
 * /api/notes/admin/{id}:
 *   delete:
 *     summary: Delete any note (Admin only)
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted by admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Note deleted by admin"
 *       404:
 *         description: Note not found
 *       403:
 *         description: Forbidden - not an admin
 */
/**
 * @swagger
 * /api/notes/admin/{id}:
 *   put:
 *     summary: Admin can update any note
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               pinned:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               reminderAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Note updated by admin
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
/**
 * @swagger
 * /api/notes/admin/{id}:
 *   get:
 *     summary: Admin - Get single note by ID
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Single note details
 *       404:
 *         description: Note not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/notes/admin/shared-map:
 *   get:
 *     summary: Admin - View who shared which note with whom
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shared notes mapping
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       noteId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       owner:
 *                         type: object
 *                       sharedWith:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: object
 *                             canEdit:
 *                               type: boolean
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/notes/admin/user/{userId}/notes:
 *   get:
 *     summary: Admin - Get all notes of a specific user
 *     tags: [Admin-Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notes of the user
 *       404:
 *         description: No notes found
 */
/**
 * @swagger
 * /api/users/admin/users:
 *   get:
 *     tags:
 *       - Admin-User
 *     summary: "Get all users (Admin only)"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: number
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       createdAt:
 *                         type: string
 */
/**
 * @swagger
 * /api/users/admin/users/{id}/role:
 *   patch:
 *     summary: Admin - Update user role
 *     tags: [Admin-User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/users/admin/users/{id}:
 *   delete:
 *     summary: Admin - Delete a user
 *     tags: [Admin-User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */