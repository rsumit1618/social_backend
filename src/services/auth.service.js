const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

exports.register = async ({ name, email, password }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashed,
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
};