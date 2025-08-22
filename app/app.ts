import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
import { validateEnv } from '../utils/config';
const ENV = validateEnv(process.env);

import { logger } from '../utils/logger';
import express from 'express';
import http from 'http';

import { resolveEndpoints } from '../lib/endpoints.resolver';
import { ErrorService } from '../services';

import endpoints from '../endpoints';

// import schema from '../graphql/schema';
import middlewares from '../middlewares/';
import { applyMiddleware } from '../middlewares/apply.middlewares';

/* Declarations */
const app: express.Application = express();

/* Express Middlewares Configuration */
applyMiddleware(middlewares, app);


/* Health check */

/* Readiness check with DB ping */
import { knex as KnexFactory } from 'knex';
import { knexConfig } from '../db/knexfile';
const readyKnex = KnexFactory(knexConfig as any);
app.get('/ready', async (_req, res) => {
    try {
        await readyKnex.raw('select 1');
        res.status(200).json({ status: 'ready' });
    } catch (err) {
        res.status(503).json({ status: 'unready' });
    }
});

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

/* API Endpoint Configuration */
resolveEndpoints(endpoints, app);

/* Missing route */
app.use(ErrorService.unknownRoute);

/* Error Handler Configuration */
app.use(ErrorService.errorHandler);


/* Graceful shutdown */
const shutdown = (signal: string) => {
    logger('app.ts', `Received ${signal}, shutting down gracefully...`);
    httpServer.close(() => {
        logger('app.ts', 'HTTP server closed');
        process.exit(0);
    });
    setTimeout(() => {
        logger('app.ts', 'Forced shutdown after timeout', 'error');
        process.exit(1);
    }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

/* Express Server Configuration */
const { PORT } = process.env;
const httpServer = new http.Server(app);

httpServer.listen(PORT, (): void => {
    logger('app.ts', `App is listening on port ${PORT}`);
});

export { app };