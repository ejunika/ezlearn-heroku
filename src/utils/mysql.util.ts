import { createPool, Pool, PoolConfig, MysqlError, PoolConnection, FieldInfo } from 'mysql';
import { has, get } from 'config';
import { DATABASES } from 'src/models/common.keys';

let poolConfig: PoolConfig = getPoolConfig();

const CONNECTION_POOL: Pool = createPool(poolConfig);

function getPoolConfig(): PoolConfig {
    let databases: any;
    if (has(DATABASES)) {
        databases = get(DATABASES);
        let defaultDatabase = databases.find((database: any) => database.id === 'default' && database.server_type === 'mysql');
        if (defaultDatabase && defaultDatabase.config) {
            return defaultDatabase.config;
        } else {
            throw new Error('NO_DEFAULT_DB_CONFIG_ERR');
        }
    } else {
        throw new Error('NO_DB_CONFIG_ERR');
    }
}

async function getConnection(): Promise<PoolConnection> {
    return new Promise((resolve: (pc: PoolConnection) => void, reject: (err: Error) => void) => {
        if (CONNECTION_POOL) {
            CONNECTION_POOL.getConnection((err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        } else {
            reject(new Error('NO_POOL_ERR'));
        }
    });
}

export async function executeQuery(query: string): Promise<any> {
    let connection = await getConnection();
    return new Promise((resolve: (qr: { results: any, fields: Array<FieldInfo> }) => void, reject: (err: Error) => void) => {
        if (connection) {
            connection.query(query, (err: MysqlError, results: any, fields: Array<FieldInfo>) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ results, fields })
                }
            });
        } else {
            reject(new Error('NO_CONN_ERR'));
        }
    });
}