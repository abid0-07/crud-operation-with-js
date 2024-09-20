const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'mydb',
    user: 'root',
    password: '0306'
});

module.exports = pool;