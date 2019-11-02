import * as Joi from 'joi';
import { EndpointHandler } from '../../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorService } from '../../services/';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';

/** Sample @method name - please change where needed */

const businessContactValidator = Joi.object().keys({
    /** Sample joi schema */
    businessId: Joi.number()
        .required(),
    website: Joi.string().required(),
    phone: Joi.string().required(),
    location: Joi.string().required()
});

const businessContactUpdateValidator = Joi.object().keys({
    /** Sample joi schema */
    id: Joi.number()
        .required(),
    website: Joi.string().optional(),
    phone: Joi.string().optional(),
    location: Joi.string().optional()
});

const validateBusinessContact: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Joi.validate(req.body, businessContactValidator);
            next();
        } catch (e) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
            ErrorService.errorHandler(error, req, res, next);
        }
    };

const validateBusinessUpdateContact: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Joi.validate(req.body, businessContactUpdateValidator);
            next();
        } catch (e) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
            ErrorService.errorHandler(error, req, res, next);
        }
    };

export {
    validateBusinessContact,
    validateBusinessUpdateContact
};
