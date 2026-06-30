const router = require('express').Router();
const pool   = require('../../db/pool');
const auth   = require('../../middleware/auth');

const ok   = (res, data, msg='OK') => res.json({ success:true, message:msg, data, timestamp:new Date().toISOString() });
const err  = (res, msg, code=500)  => res.status(code).json({ success:false, message:msg });

// All routes require JWT auth
router.use(auth);

// GET /api/v1/admin/blog
router.get('/', async (req, res) => {
  try {
    const page   = parseInt(req.query.page || '0');
    const size   = parseInt(req.query.size || '20');
    const offset = page * size;
    const { rows } = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT $1 OFFSET $2', [size, offset]
    );
    const { rows: cnt } = await pool.query('SELECT COUNT(*) FROM blog_posts');
    ok(res, { content: rows, totalElements: parseInt(cnt[0].count), totalPages: Math.ceil(cnt[0].count/size), page, size });
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// GET /api/v1/admin/blog/:id
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts WHERE id=$1', [req.params.id]);
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0]);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// POST /api/v1/admin/blog
router.post('/', async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, author, cover_image, published, featured, read_time } = req.body;
    if (!title || !content) return err(res, 'title and content required', 400);
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title,slug,excerpt,content,category,tags,author,cover_image,published,featured,read_time)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [title, slug||title.toLowerCase().replace(/\s+/g,'-'), excerpt||null, content, category||null,
       tags||null, author||'Specter Technologies', cover_image||null,
       published||false, featured||false, read_time||'5 min read']
    );
    res.status(201).json({ success:true, message:'Post created', data:rows[0], timestamp:new Date().toISOString() });
  } catch (e) { console.error(e); err(res, e.code==='23505'?'Slug already exists':'Server error', e.code==='23505'?409:500); }
});

// PUT /api/v1/admin/blog/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, author, cover_image, published, featured, read_time } = req.body;
    const { rows } = await pool.query(
      `UPDATE blog_posts SET title=$1,slug=$2,excerpt=$3,content=$4,category=$5,tags=$6,
       author=$7,cover_image=$8,published=$9,featured=$10,read_time=$11,updated_at=NOW()
       WHERE id=$12 RETURNING *`,
      [title, slug, excerpt, content, category, tags, author, cover_image, published, featured, read_time, req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], 'Post updated');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// DELETE /api/v1/admin/blog/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM blog_posts WHERE id=$1', [req.params.id]);
    if (!rowCount) return err(res, 'Not found', 404);
    ok(res, null, 'Post deleted');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

// PATCH /api/v1/admin/blog/:id/toggle-publish
router.patch('/:id/toggle-publish', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE blog_posts SET published=NOT published, updated_at=NOW() WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], rows[0].published ? 'Post published' : 'Post unpublished');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

module.exports = router;
