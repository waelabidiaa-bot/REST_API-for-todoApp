const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT auth error:', err);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;