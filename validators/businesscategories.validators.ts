import Joi from 'joi';
import { EndpointHandler } from '../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorService } from '../services/';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import { messages } from '../constants/messages.constants';

/** Sample @method name - please change where needed */

const businessCategoriesValidator = Joi.object({
    /** Sample joi schema */
    businessId: Joi.number()
        .required(),
    categoryId: Joi.number().required()
});

const businessCategoriesUpdateValidator = Joi.object({
    /** Sample joi schema */
    id: Joi.number()
        .required(),
    categoryId: Joi.number().required()
});



const validateBusinessCategories: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await businessCategoriesValidator.validateAsync(req.body);
            next();
        } catch (e: any) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details || e.message);
            ErrorService.errorHandler(error, req, res, next);
        }
    };

const validateBusinessCategoriesUpdate: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await businessCategoriesUpdateValidator.validateAsync(req.body);
            next();
        } catch (e: any) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details || e.message);
            ErrorService.errorHandler(error, req, res, next);
        }
    };

export {
    validateBusinessCategories,
    validateBusinessCategoriesUpdate
};
