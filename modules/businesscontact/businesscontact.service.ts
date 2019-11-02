import { Request, Response } from 'express';
import {
    getBusinessContactController,
    addBusinessContactController,
    removeBusinessContactController,
    updateBusinessContactController
} from './businessContact.controllers';

import { sendSuccess } from '../../services/responses/success.response';
import { messages } from '../../constants/messages.constants';
import { ErrorService } from '../../services';

class BusinessContactService {
    public constructor() { }

    public async getBusinessContact(req: Request, res: Response): Promise<void> {
        try {
            let data;
            await getBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res);
        }
    }

    public async addBusinessContact(req: Request, res: Response): Promise<void> {
        try {
            let data;
            await addBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res);
        }
    }

    public async updateBusinessContact(req: Request, res: Response): Promise<void> {
        try {
            let data;
            await updateBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res);
        }
    }

    public async removeBusinessContact(req: Request, res: Response): Promise<void> {
        try {
            let data;
            await removeBusinessContactController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessContact.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res);
        }
    }
}

export default new BusinessContactService; 
