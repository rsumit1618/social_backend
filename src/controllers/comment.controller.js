// comment.controller.js

const commentService = require('../services/comment.service');

exports.addComment = async (req, res) => {
  try {
    const comment = await commentService.addComment(
      req.user.id,
      req.params.postId,
      req.body.content
    );
    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.postId);
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};