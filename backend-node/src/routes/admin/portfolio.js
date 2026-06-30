const router = require('express').Router();
const pool   = require('../../db/pool');
const auth   = require('../../middleware/auth');

const ok  = (res, data, msg='OK') => res.json({ success:true, message:msg, data, timestamp:new Date().toISOString() });
const err = (res, msg, code=500)  => res.status(code).json({ success:false, message:msg });

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '0'), size = parseInt(req.query.size || '20');
    const { rows } = await pool.query('SELECT * FROM portfolio_projects ORDER BY created_at DESC LIMIT $1 OFFSET $2', [size, page*size]);
    const { rows: cnt } = await pool.query('SELECT COUNT(*) FROM portfolio_projects');
    ok(res, { content: rows, totalElements: parseInt(cnt[0].count), totalPages: Math.ceil(cnt[0].count/size), page, size });
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM portfolio_projects WHERE id=$1', [req.params.id]);
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0]);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.post('/', async (req, res) => {
  try {
    const { title, client, category, description, technologies, metrics, year, featured, published } = req.body;
    if (!title) return err(res, 'title required', 400);
    const { rows } = await pool.query(
      `INSERT INTO portfolio_projects (title,client,category,description,technologies,metrics,year,featured,published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [title, client||null, category||null, description||null, technologies||null, metrics||null, year||null, featured||false, published!==false]
    );
    res.status(201).json({ success:true, message:'Project created', data:rows[0], timestamp:new Date().toISOString() });
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, client, category, description, technologies, metrics, year, featured, published } = req.body;
    const { rows } = await pool.query(
      `UPDATE portfolio_projects SET title=$1,client=$2,category=$3,description=$4,
       technologies=$5,metrics=$6,year=$7,featured=$8,published=$9 WHERE id=$10 RETURNING *`,
      [title, client, category, description, technologies, metrics, year, featured, published, req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], 'Project updated');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM portfolio_projects WHERE id=$1', [req.params.id]);
    if (!rowCount) return err(res, 'Not found', 404);
    ok(res, null, 'Project deleted');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

module.exports = router;
