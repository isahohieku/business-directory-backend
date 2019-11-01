import { Request, Response, NextFunction } from 'express';
import {
    getContactController,
    addContactController,
    removeContactController,
    updateContactController
} from './contact.controllers';

import { sendSuccess } from '../../services/responses/success.response';
import { messages } from '../../constants/messages.constants';

class ContactService {
    public constructor() { }

    public async getContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'contact.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            next(e);
            // ErrorService.errorHandler(e, req, res);
        }
    }

    public async addContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'contact.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            next(e);
        }
    }

    public async removeContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'contact.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            next(e);
        }
    }

    public async updateContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'contact.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            next(e);
        }
    }
}

export default new ContactService; 
