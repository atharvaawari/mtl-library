const mysql = require('mysql')
require('dotenv').config()
const pool = require('./db_pool');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect( (err)=> {
    if(err) throw err;
    console.log("db_myl CONNECTED!");
})

// connection.query(" CREATE DATABASE db_myl", (err, result)=>{
//     if(err) throw err;
//     console.log("Database is Created");
// })


// function queryDatabase() {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM users', (error, results) => {
//             if (error) {
//                 return reject(error);
//             }
//             resolve(results);
//         });
//     });
// }

// // Call the function to query the database
// queryDatabase()
//     .then(results => {
//         console.log('Query results:', results);
//         // Close the pool after all operations are done
//         pool.end((err) => {
//             if (err) {
//                 console.error('Error closing the pool:', err.message);
//             } else {
//                 console.log('Pool was closed.');
//             }
//         });
//     })
//     .catch(err => {
//         console.error('Error querying the database:', err.message);
//         // Ensure the pool is closed in case of an error
//         pool.end((err) => {
//             if (err) {
//                 console.error('Error closing the pool:', err.message);
//             } else {
//                 console.log('Pool was closed.');
//             }
//         });
//     });
module.exports = connection;