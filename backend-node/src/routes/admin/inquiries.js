const router = require('express').Router();
const pool   = require('../../db/pool');
const auth   = require('../../middleware/auth');

const ok  = (res, data, msg='OK') => res.json({ success:true, message:msg, data, timestamp:new Date().toISOString() });
const err = (res, msg, code=500)  => res.status(code).json({ success:false, message:msg });

const VALID_STATUSES = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'];

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '0'), size = parseInt(req.query.size || '20');
    const { rows } = await pool.query(
      'SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT $1 OFFSET $2', [size, page*size]
    );
    const { rows: cnt } = await pool.query('SELECT COUNT(*) FROM contact_inquiries');
    ok(res, { content: rows, totalElements: parseInt(cnt[0].count), totalPages: Math.ceil(cnt[0].count/size), page, size });
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contact_inquiries WHERE id=$1', [req.params.id]);
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0]);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) return err(res, `status must be one of: ${VALID_STATUSES.join(', ')}`, 400);
    const { rows } = await pool.query(
      'UPDATE contact_inquiries SET status=$1 WHERE id=$2 RETURNING *', [status, req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], 'Status updated');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

module.exports = router;
