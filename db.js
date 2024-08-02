const { createPool } = require('@vercel/postgres');

const pool = createPool({
  connectionString: 'postgres://default:YJu1khP0KqmS@ep-old-dust-a4tavg32-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
