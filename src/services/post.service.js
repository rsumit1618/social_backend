const postRepo = require('../repositories/post.repository');

exports.createPost = async (userId, data) => {
  const { content, image_url } = data;

  return await postRepo.createPost(userId, content, image_url);
};

exports.getPosts = async () => {
  return await postRepo.getAllPosts();
};

exports.getAllPosts = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;

  return await postRepo.getAllPosts(limit, offset);
};

exports.getTotalPosts = async (page = 1, limit = 5) => {
  const offset = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    postRepo.getAllPosts(limit, offset),
    postRepo.getTotalPosts()
  ]);

  return { posts, total };
};