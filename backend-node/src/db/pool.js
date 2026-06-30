const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5433'),
  database: process.env.DB_NAME     || 'specter_db',
  user:     process.env.DB_USER     || 'specter',
  password: process.env.DB_PASSWORD || 'specter_pass',
  ssl:      process.env.PGSSLMODE === 'no-verify'
              ? { rejectUnauthorized: false }
              : false,
});

pool.on('error', (err) => console.error('Unexpected DB pool error', err));

module.exports = pool;
