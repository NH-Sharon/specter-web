const router = require('express').Router();
const pool   = require('../../db/pool');
const auth   = require('../../middleware/auth');

const ok  = (res, data, msg='OK') => res.json({ success:true, message:msg, data, timestamp:new Date().toISOString() });
const err = (res, msg, code=500)  => res.status(code).json({ success:false, message:msg });

router.use(auth);

// GET /api/v1/admin/content  — list all sections
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM site_content ORDER BY section_key');
    ok(res, rows);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// GET /api/v1/admin/content/:key
router.get('/:key', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM site_content WHERE section_key=$1', [req.params.key]);
    if (!rows.length) return ok(res, { section_key: req.params.key, content_json: '{}' });
    ok(res, rows[0]);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// PUT /api/v1/admin/content/:key  — upsert
router.put('/:key', async (req, res) => {
  try {
    const { contentJson } = req.body;
    if (!contentJson) return err(res, 'contentJson required', 400);
    // Validate JSON
    try { JSON.parse(contentJson); } catch { return err(res, 'contentJson must be valid JSON', 400); }

    const { rows } = await pool.query(
      `INSERT INTO site_content (section_key, content_json)
       VALUES ($1, $2)
       ON CONFLICT (section_key) DO UPDATE SET content_json=$2, updated_at=NOW()
       RETURNING *`,
      [req.params.key, contentJson]
    );
    ok(res, rows[0], 'Content saved');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

module.exports = router;
