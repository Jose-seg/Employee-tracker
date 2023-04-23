// dotenv for hiding credentials when pushing to github
require('dotenv').config();
// connection to SQL using MYSQL2 paackage:
const mysql = require('mysql2');
/* Here our credentials wont be exposed and will be pulled from .env file 
 which will be hidden */
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employee_db database.');
});

module.exports = connection;