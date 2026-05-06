// comment.service.js

const commentRepo = require('../repositories/comment.repository');

exports.addComment = async (userId, postId, content) => {
  return await commentRepo.addComment(userId, postId, content);
};

exports.getComments = async (postId) => {
  return await commentRepo.getComments(postId);
};