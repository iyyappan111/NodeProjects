const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'sample',
};

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

module.exports = promisePool;
