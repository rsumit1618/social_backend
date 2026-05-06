// like.repository.js

const pool = require('../config/db');

exports.likePost = async (userId, postId) => {
  const res = await pool.query(
    `INSERT INTO likes (user_id, post_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, post_id) DO NOTHING
     RETURNING *`,
    [userId, postId]
  );

  return res.rows[0];
};

exports.unlikePost = async (userId, postId) => {
  await pool.query(
    `DELETE FROM likes WHERE user_id=$1 AND post_id=$2`,
    [userId, postId]
  );
};