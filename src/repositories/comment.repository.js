// comment.repository.js

const pool = require('../config/db');

exports.addComment = async (userId, postId, content) => {
  const res = await pool.query(
    `INSERT INTO comments (user_id, post_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, postId, content]
  );
  return res.rows[0];
};

exports.getComments = async (postId) => {
  const res = await pool.query(
    `SELECT c.*, u.name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE post_id=$1
     ORDER BY c.created_at DESC`,
    [postId]
  );
  return res.rows;
};