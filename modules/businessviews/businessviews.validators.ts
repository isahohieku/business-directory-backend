import * as Joi from 'joi';
import { EndpointHandler } from '../../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorService } from '../../services/';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';

/** Sample @method name - please change where needed */

const businessViewsValidator = Joi.object().keys({
    /** Sample joi schema */
    businessId: Joi.number()
        .required()
});

const businessViewsUpdateValidator = Joi.object().keys({
    /** Sample joi schema */
    id: Joi.number()
        .required()
});

const validateBusinessViews: EndpointHandler 
= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, businessViewsValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        ErrorService.errorHandler(error, req, res, next);
    }
};

const validateBusinessViewsUpdate: EndpointHandler 
= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, businessViewsUpdateValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        ErrorService.errorHandler(error, req, res, next);
    }
};

export {
    validateBusinessViews,
    validateBusinessViewsUpdate
};
