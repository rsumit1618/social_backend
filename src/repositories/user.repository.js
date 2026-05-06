const pool = require('../config/db');

exports.findByEmail = async (email) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
};

exports.createUser = async ({ name, email, password }) => {
  const res = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, password]
  );
  return res.rows[0];
};