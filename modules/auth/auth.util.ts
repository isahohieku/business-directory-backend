import { config } from 'dotenv';
config({ path: __dirname + '/../../../.env' });
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import { messages } from '../../constants/messages.constants';
import LoginModel from '../../db/models/login.model';
import * as _ from 'lodash';
import { Request, Response } from 'express';

const SECRET_KEY = process.env.JWT_SECRET;
const userData = ['fullName', 'id', 'createdAt', 'updatedAt', 'email'];

const generateJWT = (model: LoginModel): string => {
    return jwt.sign(model, SECRET_KEY as jwt.Secret, {
        expiresIn: 60 * 60 * 24 // expires in a day
    });
};

const generateEncryptedPassword = async (data: string | undefined): Promise<string | undefined> => {
    let password = bcrypt.hash(data, 12);
    return password;
};

const passwordMatch = async(password: string, hash: string): Promise<boolean | undefined> => {
    const match = bcrypt.compare(password, hash);
    return match;
};

const pickUserData = (object: any): any => _.pick(object, userData);

const pickToken = (req: Request): string | undefined => {
    let token: string | undefined = req.headers['x-access-token'] as string || req.headers['authorization'];
    if (typeof token === 'string' && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        return token;
    }
};

const verifyTok = (req: Request, res: Response, token: string): string | object | undefined => {
    if (typeof SECRET_KEY === 'string') {
        let decodedToken;

        jwt.verify(token, SECRET_KEY, (err, decoded): void => {
            if (err) {
                throw new CustomError(codes.ERROR_INVALID_TOKEN, messages.ERROR_INVALID_TOKEN, 401);                
            }
            decodedToken = decoded;
        });
        return decodedToken;
    }
};

export { 
    generateJWT, 
    generateEncryptedPassword, 
    passwordMatch, 
    pickUserData,
    verifyTok,
    pickToken
};