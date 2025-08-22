import { Request, Response, NextFunction } from 'express';
import {
    getCategoriesController,
    addCategoriesController,
    removeCategoriesController,
    updateCategoriesController
} from '../controllers/categories.controllers';

import { sendSuccess } from '../responses/success.response';
import { messages } from '../constants/messages.constants';
import { ErrorService } from '.';

class CategoriesService {
    public constructor() { }

    public async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'categories.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'categories.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'categories.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeCategoriesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'categories.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new CategoriesService; 
