const { Pool } = require('pg');
require('dotenv').config();

const isRailway = !!process.env.RAILWAY_ENVIRONMENT || !!process.env.PGHOST;

const pool = new Pool({
  host:     process.env.DB_HOST     || process.env.PGHOST    || 'localhost',
  port:     parseInt(process.env.DB_PORT || process.env.PGPORT || '5433'),
  database: process.env.DB_NAME     || process.env.PGDATABASE || 'specter_db',
  user:     process.env.DB_USER     || process.env.PGUSER    || 'specter',
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'specter_pass',
  ssl:      isRailway ? { rejectUnauthorized: false, require: false } : false,
});

pool.on('error', (err) => console.error('Unexpected DB pool error', err));

module.exports = pool;
