import Joi from 'joi';
import { EndpointHandler } from '../lib/endpoint.handler';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import { messages } from '../constants/messages.constants';
import { logger } from '../utils/logger';
import { pickToken, verifyTok } from '../utils/auth.util';

const signupValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    fullName: Joi.string().required()
});

const loginValidator = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required()
});

const validateSignup: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await signupValidator.validateAsync(req.body);
        next();
    } catch (e: any) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details || e.message);
        next(error);
    }
};

const validateLogin: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await loginValidator.validateAsync(req.body);
        next();
    } catch (e: any) {
        const error = new CustomError(codes.UNPROCESSED_ENTITY, messages.ERROR_UNPROCESSED_ENTITY, 422, e.details || e.message);
        next(error);
    }
};

const verifyToken: EndpointHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = pickToken(req);
        if (!token) {
            throw new CustomError(codes.ERROR_MISSING_TOKEN, messages.ERROR_MISSING_TOKEN, 401);
        }

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
