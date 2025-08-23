import { Request, Response, NextFunction } from 'express';
import {
    getBusinessesController,
    getRecentBusinessesController,
    getBusinessesMetaController,
    addBusinessesController,
    removeBusinessesController,
    updateBusinessesController
} from '../controllers/businesses.controllers';

import { sendSuccess } from '../responses/success.response';
import { messages } from '../constants/messages.constants';
import { ErrorService } from '.';

class BusinessesService {
    public constructor() { }

    public async getBusinesses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async getRecentBusinesses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getRecentBusinessesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async getBusinessesMeta(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await getBusinessesMetaController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controllers.ts', data, messages.NO_MESSAGE);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async addBusinesses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await addBusinessesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controller.ts', data, messages.CONTACT_ADDED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async updateBusinesses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await updateBusinessesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controller.ts', data, messages.CONTACT_UPDATED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }

    public async removeBusinesses(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let data;
            await removeBusinessesController(req)
                .then((res): void => {
                    data = res;
                });

            sendSuccess(res, 'businesses.controller.ts', data, messages.CONTACT_REMOVED_SUCCESSFULLY);
        } catch (e) {
            ErrorService.errorHandler(e, req, res, next);
        }
    }
}

export default new BusinessesService; 
