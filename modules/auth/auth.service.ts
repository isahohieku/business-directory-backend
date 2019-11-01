import { Request, Response, NextFunction } from 'express';

import { sendSuccess } from '../../services/responses/success.response';
import { CustomError } from '../../lib/custom.error';

import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';

import { getUser, addUser } from './auth.data';
import LoginModel from '../../db/models/login.model';
import { passwordMatch, generateJWT, pickUserData } from './auth.util';

import { main } from '../../constants/main.constants';

class AuthService {
    public constructor() { }

    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const data = req.body;
            const user = await getUser(data.email);

            if (user) {
                throw new CustomError(codes.USER_EXIST, messages.ERROR_USER_EXIST, 401);
            }

            const result = await addUser(data);

            sendSuccess(res, 'auth.controllers.ts', result, messages.REGISTRATION_SUCCESSFUL);
        } catch (e) {
            next(e);
        };
    }

    public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            let user: LoginModel | undefined = await getUser(email);

            if (typeof user === 'undefined') {
                throw new CustomError(codes.ERROR_USER_NOT_FOUND, messages.ERROR_USER_NOT_FOUND, 404);
            }

            if ((user instanceof LoginModel) && typeof user.password === 'string') {
                await passwordMatch(password, user.password)
                    .then((match): void => {
                        if (!match) {
                            throw new CustomError(codes.ERROR_WRONG_CREDENTIALS, messages.ERROR_WRONG_CREDENTIALS, 422);
                        }
                    });
            }

            user = pickUserData(user);

            if (user) {
                user.token = generateJWT(user as LoginModel);
            }

            if (user) {
                sendSuccess(res, 'auth.service.ts', user);
            }

        } catch (e) {
            next(e);;
        }
    }
}

export default new AuthService; 
