/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
/**
 * @swagger
 * /api/profile/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Name"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
/**
 * @swagger
 * /api/profile/me/password:
 *   put:
 *     summary: Update logged-in user's password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "oldPass@123"
 *               newPassword:
 *                 type: string
 *                 example: "NewPass@123"
 *               passwordConfirm:
 *                 type: string
 *                 example: "NewPass@123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Current password incorrect
 */
/**
 * @swagger
 * /api/profile/logout:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logged out successfully
 */


