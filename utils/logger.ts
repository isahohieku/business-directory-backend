import { config } from 'dotenv';
config({ path: __dirname + '/../.env' });
import { createLogger, format, transports } from 'winston';
import path from 'path';
import { debug } from 'debug';

const errorFilePath = path.join(__dirname, '..', 'logs', 'error.log');
const appFilePath = path.join(__dirname, '..', 'logs', 'app.log');

const logger = (mod: string, message: string, type?: string): void => {
    const log = createLogger({
        format: format.combine(
            format.json(),
            format.timestamp(),
            format.prettyPrint()
        ),
        defaultMeta: { module: mod },
        transports: [
            new transports.File({ filename: errorFilePath, level: 'error' }),
            new transports.File({ filename: appFilePath })
        ]
    });

    if (type === 'error') {
        log.error(message, []);
    } else {
        log.info(message, []);
    }

    const debugs = debug(`contact:${mod}`);

    debugs(message);

    if (process.env.NODE_ENV !== 'production') {
        log.add(new transports.Console({
            format: format.simple()
        }));
    }
};

export { logger };


