// src/controllers/post.controller.js

const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.user.id, req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const posts = await postService.getAllPosts(page, limit);

    res.json({
      success: true,
      page,
      limit,
      data: posts
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getTotalPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { posts, total } = await postService.getTotalPosts(page, limit);

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: posts
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};