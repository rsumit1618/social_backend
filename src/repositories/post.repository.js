const pool = require('../config/db');

exports.createPost = async (userId, content, imageUrl) => {
  const result = await pool.query(
    `INSERT INTO posts (user_id, content, image_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, content, imageUrl]
  );

  return result.rows[0];
};

exports.getAllPosts = async () => {
  const result = await pool.query(
    `SELECT p.*, u.name
     FROM posts p
     JOIN users u ON p.user_id = u.id
     ORDER BY p.created_at DESC`
  );

  return result.rows;
};

exports.getAllPosts = async (limit, offset) => {
  const result = await pool.query(
    `SELECT p.*, u.name,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count
     FROM posts p
     JOIN users u ON p.user_id = u.id
     ORDER BY p.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return result.rows;
};

exports.getTotalPosts = async () => {
  const res = await pool.query(`SELECT COUNT(*) FROM posts`);
  return parseInt(res.rows[0].count);
};