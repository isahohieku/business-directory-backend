import * as Joi from 'joi';
import { EndpointHandler } from '../../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { ErrorService } from '../../services/';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';
import { logger } from '../../utils/logger';
import { pickToken, verifyTok } from './auth.util';

const signupValidator = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    fullName: Joi.string().required()
});

const loginValidator = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required()
});

const validateSignup: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, signupValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        next(error);
    }
};

const validateLogin: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, loginValidator);
        next();
    } catch (e) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details);
        next(error);
    }
};

const verifyToken: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = pickToken(req);
        if (!token) {
            throw new CustomError(codes.ERROR_MISSING_TOKEN, messages.ERROR_MISSING_TOKEN, 401);
        }

        // console.log(token);

        if (token) {
            verifyTok(req, res, token);
        }
        logger('auth.service.ts', 'Token verified', 'info');
        next();
    } catch (e) {
        next(e);
    }
};

export {
    validateLogin,
    validateSignup,
    verifyToken
};
