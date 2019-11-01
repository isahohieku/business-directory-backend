import { main } from '../../constants/main.constants';
import { codes } from '../../constants/api_response_codes.constants';
import { logger } from '../../utils/logger';
import { Response } from "express";
import { APIResponse } from '../../lib/api.response';

/**
 * Sends a response with a success status
 * @param res
 * @param mod Module where the success occoured
 * @param message
 * @param data
 * @param pagination
 */

export const sendSuccess
    = (res: Response,
        mod: string,
        data?: object | object[] | undefined,
        message = main.EMPTY_STRING,
        pagination?: string | undefined
    ): Response => {
        logger(mod, message, 'info');

        return res.status(codes.DEFAULT_SUCCESS_STATUS_CODE)
            .send(new APIResponse(main.SUCCESS, codes.DEFAULT_SUCCESS_STATUS_CODE, message, pagination, data));
    };