// like.service.js

const likeRepo = require('../repositories/like.repository');

exports.likePost = async (userId, postId) => {
  return await likeRepo.likePost(userId, postId);
};

exports.unlikePost = async (userId, postId) => {
  return await likeRepo.unlikePost(userId, postId);
};