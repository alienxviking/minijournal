// server/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. If token exists, verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Attach the user's ID to the request object
    req.user = decoded.user;
    next(); // Move on to the next function (the route handler)
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};