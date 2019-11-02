import { Request, Response, NextFunction } from 'express';
import {
    getBusinessCategoriesController,
    addBusinessCategoriesController,
    removeBusinessCategoriesController,
    updateBusinessCategoriesController
} from './businessCategories.controllers';

import { sendSuccess } from '../../services/responses/success.response';
import { messages } from '../../constants/messages.constants';
import { ErrorService } from '../../services';

class BusinessCategoriesService {
    public constructor() { }

    public async getBusinessCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessCategories.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addBusinessCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addBusinessCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessCategories.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateBusinessCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateBusinessCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessCategories.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeBusinessCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeBusinessCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businessCategories.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new BusinessCategoriesService; 
