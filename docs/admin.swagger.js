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
 *         description: List of all notes
 *       403:
 *         description: Forbidden - Admin only
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
 *                 message:
 *                   type: string
 *       404:
 *         description: Note not found
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/notes/admin/{id}:
 *   put:
 *     summary: Update any note (Admin only)
 *     tags: [Admin-Notes]
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
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/notes/admin/{id}:
 *   get:
 *     summary: Get single note by ID (Admin)
 *     tags: [Admin-Notes]
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
 *         description: Note details
 *       404:
 *         description: Note not found
 */

/**
 * @swagger
 * /api/notes/admin/shared-map:
 *   get:
 *     summary: View note sharing map (Admin)
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
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes/admin/user/{userId}/notes:
 *   get:
 *     summary: Get all notes of a specific user (Admin)
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
 *         description: User notes list
 *       404:
 *         description: No notes found
 */

/**
 * @swagger
 * /api/users/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin-User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 */

/**
 * @swagger
 * /api/users/admin/users/{id}/role:
 *   patch:
 *     summary: Update user role (Admin)
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
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin)
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
 *         description: User deleted
 *       404:
 *         description: User not found
 */
