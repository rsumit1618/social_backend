const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);

module.exports = router;