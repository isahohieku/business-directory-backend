import { Request, Response, NextFunction } from 'express';
import {
    getBusinessViewsController,
    addBusinessViewsController,
    removeBusinessViewsController,
    updateBusinessViewsController
} from '../controllers/businessviews.controllers';

import { sendSuccess } from '../responses/success.response';
import { messages } from '../constants/messages.constants';
import { ErrorService } from '.';

class BusinessViewsService {
    public constructor() { }

    public async getBusinessViews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessViewsController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessViews.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addBusinessViews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addBusinessViewsController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessViews.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateBusinessViews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateBusinessViewsController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessViews.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeBusinessViews(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeBusinessViewsController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessViews.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new BusinessViewsService; 
