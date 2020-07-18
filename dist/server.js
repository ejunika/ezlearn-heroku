"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = require("swagger-ui-express");
const path_1 = require("path");
const yamljs_1 = require("yamljs");
const mysql_1 = require("mysql");
const app = express_1.default();
const PORT = process.env.PORT || 5000;
const swaggerDocument = yamljs_1.load(path_1.join(__dirname, './api.yaml'));
app.use('/api-docs', swagger_ui_express_1.serve, swagger_ui_express_1.setup(swaggerDocument));
app.get('/', (req, res) => {
    let pool = mysql_1.createPool({
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
            });
        }
        else {
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

//# sourceMappingURL=../maps/server.js.map
