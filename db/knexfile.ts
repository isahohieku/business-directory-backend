
// require('ts-node/register');

import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
import { logger } from '../utils/logger';

const development = {
    client: 'pg',
    connection: process.env.DATABASE_URL ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    } : {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'migrations'
    },
    acquireConnectionTimeout: 3000,
    pool: {
        min: 1,
        max: 1,
        afterCreate: function (connection: any, callback: any): void {
            logger('db', 'Connection created', 'info');
            connection.query('SET timezone = "UTC";', function (err: any): any {
                callback(err, connection);
            });
        }
    },
    seeds: {
        directory: './seeds/dev'
    }
};

const test = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: false
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'migrations'
    },
    acquireConnectionTimeout: 3000,
    pool: {
        min: 1,
        max: 1,
        afterCreate: function (connection: any, callback: any): void {
            logger('db', 'Connection created', 'info');
        }
    },
    seeds: {
        directory: './seeds/dev'
    }
};

const _Config = {
    getKnexInstance(): any {
        if (process.env.NODE_ENV === 'test') {
            return this.test;
        }
        if (process.env.NODE_ENV === 'development') {
            return this.development;
        }
        if (process.env.NODE_ENV === 'production') {
            return this.development;
        }
        // Default to development config if NODE_ENV is not set
        return this.development;
    },
    development,
    test
};

const knexConfig = _Config.getKnexInstance();

export { knexConfig, test, development };
