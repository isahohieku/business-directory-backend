import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
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

/* API Endpoint Configuration */
resolveEndpoints(endpoints, app);

/* Missing route */
app.use(ErrorService.unknownRoute);

/* Error Handler Configuration */
app.use(ErrorService.errorHandler);

/* Express Server Configuration */
const { PORT } = process.env;
const httpServer = new http.Server(app);

httpServer.listen(PORT, (): void => {
    logger('app.ts', `App is listening on port ${PORT}`);
});

export { app };