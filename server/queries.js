const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'EventBuddyDB',
  password: '290500',
  port: 4000,
})

module.exports = pool;