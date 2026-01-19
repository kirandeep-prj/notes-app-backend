/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get user notes (search, sort & pagination)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: meeting
 *         description: Search notes by title, content or tags
 *
 *       - in: query
 *         name: isPinned
 *         schema:
 *           type: boolean
 *         example: true
 *         description: Filter only pinned notes
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: createdAt
 *         description: Field to sort by (createdAt, title)
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         enum: [asc, desc]
 *         example: desc
 *         description: Sort order (asc = ascending, desc = descending)
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default 1)
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *         description: Number of notes per page (default 5)
 *
 *     responses:
 *       200:
 *         description: List of user notes
 *
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["work", "important"]
 *               reminderAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-25T10:00:00.000Z"
 *               pinned:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Note created
 */
/**
 * @swagger
 * /api/notes/admin/all:
 *   get:
 *     summary: Get all notes (Admin only)
 *     tags: [Admin]
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
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
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
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["study", "exam"]
 *               reminderAt:
 *                 type: string
 *                 format: date-time
 *               pinned:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Note updated
 *
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
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
 *         description: Note deleted
 */
/**
 * @swagger
 * /api/notes/{id}/pin:
 *   patch:
 *     summary: Pin or unpin a note
 *     tags: [Notes]
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
 *         description: Note pinned/unpinned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 isPinned:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Note not found
 */
/**
 * @swagger
 * /api/notes/{id}/share:
 * post:
 * summary: Share a note with another user
 * tags: [Notes]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 *   name: id
 *   required: true
 *   schema:
 *     type: string
 *   description: Note ID
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         required:
 *           - userId
 *           - canEdit
 *         properties:
 *           userId:
 *             type: string
 *             example: "65a1b2c3d4e5f6a7b8c9d0e1"
 *           canEdit:
 *             type: boolean
 *             example: true
 *             description: "Set true to allow the shared user to edit the note"
 * responses:
 *   200:
 *     description: Note shared successfully
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             message:
 *               type: string
 *               example: "Note shared successfully"
 *   400:
 *     description: Note already shared
 *   404:
 *     description: Note not found
 */
/**
 * @swagger
 * /api/notes/shared:
 *   get:
 *     summary: Get notes shared with the logged-in user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes shared with the user
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
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       sharedWith:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                             canEdit:
 *                               type: boolean
 *                               example: false
 *       401:
 *         description: Unauthorized (no token)
 */
/**
 * @swagger
 * /api/notes/shared/by-me:
 *   get:
 *     summary: Get notes that I have shared with other users
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes shared by the logged-in user
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
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       sharedWith:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                             canEdit:
 *                               type: boolean
 *                               example: false
 *       401:
 *         description: Unauthorized (no token)
 */
