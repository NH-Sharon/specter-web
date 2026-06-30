const jwt  = require('jsonwebtoken');
const pool = require('../db/pool');

module.exports = async function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const { rows } = await pool.query(
      'SELECT id, username, full_name, role, active FROM admin_users WHERE username=$1',
      [payload.sub]
    );
    if (!rows.length || !rows[0].active) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }
    req.user = rows[0];
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
