import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import { join } from 'path';
import { load } from 'yamljs';
import cors from 'cors';
import { executeQuery } from './utils/mysql.util';

const app = express();

const PORT = process.env.PORT || 5000;

const swaggerDocument = load(join(__dirname, './api.yaml'));

app.use(cors());

app.use('/api-docs', serve, setup(swaggerDocument));

app.get('/v1/api/users', async (req, res) => {
    try {
        let { results } = await executeQuery('SELECT * FROM app_users');
        res.json({
            message: 'Success',
            data: results
        });
    } catch (error) {
        res.json({
            message: 'Failure',
            data: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});