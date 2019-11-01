import * as Joi from 'joi';
import { EndpointHandler } from '../../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';

/** Sample @method name - please change where needed */

const contactValidator = Joi.object().keys({
    /** Contact joi schema */
    fullName: Joi.string().required(),
    authorId: Joi.number().required(),
    title: Joi.string().optional()
});

const contactUpdateValidator = Joi.object().keys({
    /** Contact joi schema */
    fullName: Joi.string().optional(),
    authorId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().optional()
});

const validateContact: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, contactValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        next(error);
    }
};

const validateContactUpdate: EndpointHandler
    = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Joi.validate(req.body, contactUpdateValidator);
            next();
        } catch (e) {
            const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
            next(error);
        }
    };

export {
    validateContact,
    validateContactUpdate
};
