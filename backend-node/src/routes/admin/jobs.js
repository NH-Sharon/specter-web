const router = require('express').Router();
const pool   = require('../../db/pool');
const auth   = require('../../middleware/auth');

const ok  = (res, data, msg='OK') => res.json({ success:true, message:msg, data, timestamp:new Date().toISOString() });
const err = (res, msg, code=500)  => res.status(code).json({ success:false, message:msg });

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM job_postings ORDER BY created_at DESC');
    ok(res, rows);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM job_postings WHERE id=$1', [req.params.id]);
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0]);
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.post('/', async (req, res) => {
  try {
    const { title, department, location, type, level, description, requirements, responsibilities, salary_range, active } = req.body;
    if (!title) return err(res, 'title required', 400);
    const { rows } = await pool.query(
      `INSERT INTO job_postings (title,department,location,type,level,description,requirements,responsibilities,salary_range,active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [title, department||null, location||null, type||null, level||null,
       description||null, requirements||null, responsibilities||null, salary_range||null, active!==false]
    );
    res.status(201).json({ success:true, message:'Job created', data:rows[0], timestamp:new Date().toISOString() });
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, department, location, type, level, description, requirements, responsibilities, salary_range, active } = req.body;
    const { rows } = await pool.query(
      `UPDATE job_postings SET title=$1,department=$2,location=$3,type=$4,level=$5,
       description=$6,requirements=$7,responsibilities=$8,salary_range=$9,active=$10
       WHERE id=$11 RETURNING *`,
      [title, department, location, type, level, description, requirements, responsibilities, salary_range, active, req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], 'Job updated');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM job_postings WHERE id=$1', [req.params.id]);
    if (!rowCount) return err(res, 'Not found', 404);
    ok(res, null, 'Job deleted');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE job_postings SET active=NOT active WHERE id=$1 RETURNING *', [req.params.id]
    );
    if (!rows.length) return err(res, 'Not found', 404);
    ok(res, rows[0], rows[0].active ? 'Job activated' : 'Job deactivated');
  } catch (e) { console.error(e); err(res, 'Server error'); }
});

module.exports = router;
