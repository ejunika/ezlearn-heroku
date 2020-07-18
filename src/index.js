const express = require('express');

const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    let pool = mysql.createPool({
        host: 'db4free.net',
        database: 'test_mysql_009',
        user: 'test_mysql_009',
        password: 'test_mysql_009'
    });
    pool.query('SELECT * FROM app_users', (err, results) => {
        if (err) {
            res.json({
                message: 'Failure',
                error: err.message
            })
        }
        console.log(results);
        res.json({
            message: 'Success',
            data: results
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})