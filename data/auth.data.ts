import { generateEncryptedPassword } from '../utils/auth.util';
import LoginModel from '../db/models/login.model';


/**
 * @param value is the value passed into the @method getUser
 * @method getUser is just a dummy that can be changed if necessary 
 */
const getUser = async (email: string): Promise<undefined | LoginModel> => {
    const result = await LoginModel.query().where({ email }).first();
    return result;
};

const addUser = async (data: LoginModel): Promise<LoginModel | undefined> => {
    const password = data.password;
    data.password = await generateEncryptedPassword(password);
    const result = await LoginModel.query().insert(data);
    delete result.password;
    return result;
};

export { getUser, addUser };
