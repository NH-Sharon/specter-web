const fs   = require('fs');
const path = require('path');
const pool = require('./pool');

async function migrate() {
  const migrationsDir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  for (const file of files) {
    const { rows } = await pool.query('SELECT 1 FROM schema_migrations WHERE filename=$1', [file]);
    if (rows.length) { console.log(`  skip  ${file}`); continue; }

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await pool.query(sql);
    await pool.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
    console.log(`  apply ${file}`);
  }

  await pool.end();
  console.log('Migrations done.');
}

migrate().catch(err => { console.error(err); process.exit(1); });
