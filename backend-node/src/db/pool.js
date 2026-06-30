const { Pool } = require('pg');
require('dotenv').config();

let pool;

const dbConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT || '5433'),
      database: process.env.DB_NAME     || 'specter_db',
      user:     process.env.DB_USER     || 'specter',
      password: process.env.DB_PASSWORD || 'specter_pass',
    };

pool = new Pool(dbConfig);

pool.on('error', (err) => console.error('Unexpected DB pool error', err));

module.exports = pool;
