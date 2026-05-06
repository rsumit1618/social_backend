// like.controller.js

const likeService = require('../services/like.service');

exports.likePost = async (req, res) => {
  try {
    const result = await likeService.likePost(req.user.id, req.params.postId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    await likeService.unlikePost(req.user.id, req.params.postId);
    res.json({ success: true, message: "Unliked" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};