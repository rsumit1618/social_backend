// comment.route.js

const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/:postId', authMiddleware, commentController.addComment);
router.get('/:postId', commentController.getComments);

module.exports = router;