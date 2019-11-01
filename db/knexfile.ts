
// require('ts-node/register');

import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
import { logger } from '../utils/logger';

const development = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
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
        port: process.env.DB_PORT
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
        // if (process.env.SITE === 'production') {
        //     return this.production;
        // }
        if (process.env.NODE_ENV === 'test') {
            return this.test;
        }

        if (process.env.NODE_ENV === 'development') {
            return this.development;
        }
    },
    development,
    test
    // production: {
    //     client: 'pg',
    //     connection: {
    //         host: process.env.DB_HOST,
    //         database: process.env.DB_NAME,
    //         user: process.env.DB_USERNAME,
    //         password: process.env.DB_PASSWORD,
    //         port: process.env.DB_PORT,
    //         typeCast: function (field, next): void | any {
    //             if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
    //                 const date = field.string();
    //                 return moment(date).isValid() ? moment(date).format('YYYY-MM-DD hh:mm A') : null;
    //             }
    //             return next();
    //         }
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations',
    //         directory: 'migrations'
    //     },
    //     pool: {
    //         min: 1,
    //         max: 1,
    //         afterCreate: function (connection, callback): void {
    //             logger('db', 'Connection created', 'info');
    //             connection.query('set time_zone = "+01:00";', function (err) {
    //                 callback(err, connection);
    //             });
    //         }
    //     },
    //     seeds: {
    //         directory: './seeds/prod'
    //     }
    // }
};

const knexConfig = _Config.getKnexInstance();

export { knexConfig, test, development };
