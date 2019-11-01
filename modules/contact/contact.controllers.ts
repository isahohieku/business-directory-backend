import { Request } from 'express';
import { messages } from '../../constants/messages.constants';
import { getContactData, addContactData, removeContactData, updateContactData } from './contact.data';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import ContactModel from '../../db/models/contact.model';

/**
 * @method addContact to add a new contact by a user
 */
const addContactController = async (req: Request): Promise<ContactModel | undefined | void> => {

    /**
     * @param fullName, @param authorId and @param title are expected to be a member of the @param req
     * @param title is optional
     */
    const { fullName, authorId, title } = req.body;

    const data: ContactModel = new ContactModel;

    data.fullName = fullName;
    data.authorId = authorId;
    data.title = title;

    const contact = await addContactData(data)
        .catch((): void => {
            throw new Error();
        });
    return contact;
};

/**
 * @method getContact to get a contact by a user
 */
const getContactController = async (req: Request): Promise<ContactModel | ContactModel[] | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: ContactModel = new ContactModel;

    data.id = id;

    const contact = await getContactData(id)
        .catch((): void => {
            throw new Error();
        });

    if (!contact) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return contact;
};

/**
 * @method removeContact to remove a contact by a user
 */
const removeContactController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: ContactModel = new ContactModel;

    data.id = id;

    const contact = await removeContactData(id)
        .catch((): void => {
            throw new Error();
        });

    if (!contact) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return contact;
};

/**
 * @method updateContact to update a contact by a user
 */
const updateContactController = async (req: Request): Promise<ContactModel | undefined | void> => {

    /**
     * @param id, @param fullName and @param title are expected to be a member of the @param req.body
     */
    const { id, authorId, fullName, title } = req.body;

    const data: ContactModel = new ContactModel;

    data.id = id;
    data.authorId = authorId;

    if (fullName) {
        data.fullName = fullName;
    }

    if (title) {
        data.title = title;
    }

    const contact = await updateContactData(data)
        .catch((): void => {
            throw new Error();
        });

    if (!contact) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return contact;
};

export { addContactController, getContactController, removeContactController, updateContactController }; 
