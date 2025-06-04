const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  createHashedPassword,
  comparePassword,
  verifyToken
}

function generateToken(account) {
  const payload = {
    id: account._id,
    email: account.email,
    name: account.name,
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
    path: '/',
  });
}

function clearAuthCookie(res) {
  res.clearCookie('token', {
    httpOnly: true,
    path: '/',
  });
}

async function createHashedPassword(password) {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}