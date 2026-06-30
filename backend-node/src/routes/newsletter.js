const router = require('express').Router();
const pool   = require('../db/pool');

// POST /api/v1/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    await pool.query(
      `INSERT INTO newsletter_subscriptions (email)
       VALUES ($1) ON CONFLICT (email) DO UPDATE SET subscribed=true`,
      [email]
    );

    res.json({ success: true, message: 'Successfully subscribed!', data: null, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
