const router     = require('express').Router();
const pool       = require('../db/pool');
const nodemailer = require('nodemailer');

function mailer() {
  if (!process.env.MAIL_USER) return null;
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587'),
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });
}

// POST /api/v1/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, service, budget } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'name, email, subject and message are required' });
    }

    const { rows } = await pool.query(
      `INSERT INTO contact_inquiries (name,email,phone,company,subject,message,service,budget)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, created_at`,
      [name, email, phone || null, company || null, subject, message, service || null, budget || null]
    );

    // Fire-and-forget email
    const transport = mailer();
    if (transport) {
      transport.sendMail({
        from: process.env.MAIL_FROM,
        to:   process.env.ADMIN_EMAIL,
        subject: `[Contact] ${subject} – ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\nBudget: ${budget}\n\n${message}`,
      }).catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you within 24 hours.',
      data: { id: rows[0].id },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
