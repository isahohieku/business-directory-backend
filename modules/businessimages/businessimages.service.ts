import { Request, Response, NextFunction } from 'express';
import {
    getBusinessImagesController,
    addBusinessImagesController,
    removeBusinessImagesController,
    updateBusinessImagesController
} from './businessImages.controllers';

import { sendSuccess } from '../../services/responses/success.response';
import { messages } from '../../constants/messages.constants';
import { ErrorService } from '../../services';

class BusinessImagesService {
    public constructor() { }

    public async getBusinessImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessImagesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessImages.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addBusinessImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addBusinessImagesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessImages.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateBusinessImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateBusinessImagesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessImages.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeBusinessImages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeBusinessImagesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessImages.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new BusinessImagesService; 
