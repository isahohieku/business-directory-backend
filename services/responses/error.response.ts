import { main } from '../../constants/main.constants';
import { messages } from '../../constants/messages.constants';
import { codes } from '../../constants/api_response_codes.constants';
import { logger } from '../../utils/logger';
import { CustomError } from '../../lib/custom.error';
import { Request, Response, NextFunction } from "express";
import { APIResponse } from '../../lib/api.response';


/**
 * Sends a json response with an error status
 * @param res Response object
 * @param code Server custom error code
 * @param message Error message
 * @param statusCode HTTP status code
 * @param data Arbitary data
 */

const throwError = (res: Response,
    code = codes.DEFAULT_ERROR_CODE,
    message = messages.GENERIC,
    statusCode = codes.DEFAULT_ERROR_STATUS_CODE,
    data: [] = []): Response => res.status(statusCode)
    .send(new APIResponse(main.ERROR, statusCode, message, code, data));

export default new class ErrorService {

    public constructor() { }

    public errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response {

        if (err instanceof CustomError) {
            logger('error.response.ts', err.message, 'error'); // For debugging
            return throwError(res, err.code, err.message, err.status, err.data);
        } else {
            logger('error.response.ts', 'uncaught exception', 'error'); // For debugging
            return throwError(res);
        }
    }

    public unknownRoute(req: Request, res: Response): Response | void {
        const message = `route: ${req.path} does not exist`;
        if (!req.route) {
            logger('error.response.ts', message, 'error');
            return throwError(res, codes.ERROR_NOT_FOUND, messages.ERROR_NOT_FOUND, 404);
        }
    }

};

