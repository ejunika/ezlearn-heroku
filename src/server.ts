import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import { join } from 'path';
import { load } from 'yamljs';
import { createPool } from 'mysql';

const app = express();

const PORT = process.env.PORT || 5000;

const swaggerDocument = load(join(__dirname, './api.yaml'));

app.use('/api-docs', serve, setup(swaggerDocument));

app.get('/v1/api/users', (req, res) => {
    let pool = createPool({
        host: 'db4free.net',
        database: 'test_mysql_009',
        user: 'test_mysql_009',
        password: 'test_mysql_009',
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
    });
    pool.query('SELECT * FROM app_users', (err, results) => {
        if (err) {
            res.json({
                message: 'Failure',
                error: err.message
            })
        } else {
            res.json({
                message: 'Success',
                data: results
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});