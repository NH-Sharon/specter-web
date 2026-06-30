// Public read-only routes for the main website frontend
const router = require('express').Router();
const pool   = require('../db/pool');

const ok = (res, data) => res.json({ success: true, message: 'OK', data, timestamp: new Date().toISOString() });

// GET /api/v1/blog  (published posts, pageable)
router.get('/blog', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '0');
    const size = parseInt(req.query.size || '10');
    const offset = page * size;

    const { rows } = await pool.query(
      `SELECT id,title,slug,excerpt,category,tags,author,cover_image,featured,read_time,created_at
       FROM blog_posts WHERE published=true ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [size, offset]
    );
    const { rows: cnt } = await pool.query('SELECT COUNT(*) FROM blog_posts WHERE published=true');
    ok(res, { content: rows, totalElements: parseInt(cnt[0].count), page, size });
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error' }); }
});

// GET /api/v1/blog/:slug
router.get('/blog/:slug', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts WHERE slug=$1 AND published=true', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Post not found' });
    ok(res, rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error' }); }
});

// GET /api/v1/portfolio
router.get('/portfolio', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM portfolio_projects WHERE published=true ORDER BY created_at DESC');
    ok(res, rows);
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error' }); }
});

// GET /api/v1/jobs
router.get('/jobs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM job_postings WHERE active=true ORDER BY created_at DESC');
    ok(res, rows);
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error' }); }
});

// GET /api/v1/content/:key
router.get('/content/:key', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM site_content WHERE section_key=$1', [req.params.key]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Content section not found' });
    ok(res, rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
