import { Request } from 'express';
import { messages } from '../constants/messages.constants';
import { getUser } from '../data/auth.data';
import { CustomError } from '../lib/custom.error';
import {codes} from '../constants/api_response_codes.constants';
import LoginModel from '../db/models/login.model';

/**
 * @method loginUser is a demo method which should be changed (if need be)
 */
const loginUser = async(req: Request): Promise<LoginModel | undefined | void> => {

    /**
     * @param email here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { email } = req.body;
    
    /**
     * @method getUser shoud also be changed to what is needed (expected)
     */
    const user = await getUser(email)
        .catch((): void => {
            throw new CustomError(codes.ERROR_USER_NOT_FOUND, messages.ERROR_USER_NOT_FOUND, 404);
        });

    return user;
};

export { loginUser }; 
