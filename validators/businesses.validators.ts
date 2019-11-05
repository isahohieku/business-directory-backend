import * as Joi from 'joi';
import { EndpointHandler } from '../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorService } from '../services';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import { messages } from '../constants/messages.constants';

/** Sample @method name - please change where needed */

const businessesValidator = Joi.object().keys({
    /** Sample joi schema */
    name: Joi.string()
        .required(),
    description: Joi.string().required()
});

const businessesUpdateValidator = Joi.object().keys({
    /** Sample joi schema */
    name: Joi.string()
        .optional(),
    id: Joi.number().required(),
    description: Joi.string().optional()
});

const validateBusinesses: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, businessesValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        ErrorService.errorHandler(error, req, res, next);
    }
};

const validateBusinessesUpdate: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Joi.validate(req.body, businessesUpdateValidator);
            next();
        } catch (e) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
            ErrorService.errorHandler(error, req, res, next);
        }
    };

export {
    validateBusinesses,
    validateBusinessesUpdate
};
