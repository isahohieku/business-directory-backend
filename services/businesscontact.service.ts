import { Request, Response, NextFunction } from 'express';
import {
    getBusinessContactController,
    addBusinessContactController,
    removeBusinessContactController,
    updateBusinessContactController
} from './businessContact.controllers';

import { sendSuccess } from '../responses/success.response';
import { messages } from '../constants/messages.constants';
import { ErrorService } from '.';

class BusinessContactService {
    public constructor() { }

    public async getBusinessContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addBusinessContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateBusinessContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeBusinessContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new BusinessContactService; 
