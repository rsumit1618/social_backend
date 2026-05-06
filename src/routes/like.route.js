// like.route.js

const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/:postId', authMiddleware, likeController.likePost);
router.delete('/:postId', authMiddleware, likeController.unlikePost);

module.exports = router;