const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const pool    = require('../db/pool');

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const { rows } = await pool.query(
      'SELECT * FROM admin_users WHERE username=$1 AND active=true',
      [username]
    );
    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    const token = jwt.sign(
      { sub: user.username, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        username:  user.username,
        fullName:  user.full_name,
        role:      user.role,
        expiresAt: Date.now() + 86400000,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
