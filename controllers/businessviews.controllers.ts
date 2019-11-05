import { Request } from 'express';
import { messages } from '../constants/messages.constants';
import {
    getBusinessViewsData,
    addBusinessViewsData, removeBusinessViewsData, updateBusinessViewsData
} from '../data/businessviews.data';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import BusinessViewsModel from '../models/businessviews.model';

/**
 * @method getBusinessViews to get a businessViews by a user
 */
const getBusinessViewsController
    = async (req: Request): Promise<BusinessViewsModel | BusinessViewsModel[] | undefined | void> => {

        /**
         * @param id are expected to be a member of the @param req
         */
        const { id } = req.query;

        const data: BusinessViewsModel = new BusinessViewsModel;

        data.id = id;

        const businessViews = await getBusinessViewsData(id)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });

        if (!businessViews) {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
        }

        return businessViews;
    };

/**
 * @method addBusinessViewsController is a demo method which should be changed (if need be)
 */
const addBusinessViewsController = async (req: Request): Promise<BusinessViewsModel | undefined | void> => {

    /**
     * @param businessId and @param views here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { businessId, views } = req.body;

    const data = new BusinessViewsModel;

    data.businessId = businessId;
    data.views = views;

    /**
     * @method addBusinessViewsData shoud also be changed to what is needed (expected)
     */
    const businessViews = await addBusinessViewsData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });
    return businessViews;
};

/**
 * @method updateBusinessViews to update a businessViews by a user
 */
const updateBusinessViewsController = async (req: Request): Promise<BusinessViewsModel | undefined | void> => {

    /**
     * @param id is expected to be a member of the @param req.body
     */
    const { businessId } = req.body;

    const data: BusinessViewsModel = new BusinessViewsModel;

    data.businessId = parseInt(businessId, 10);

    const businessViews = await updateBusinessViewsData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessViews) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return businessViews;
};

/**
 * @method removeBusinessViews to remove a businessViews by a user
 */
const removeBusinessViewsController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessViewsModel = new BusinessViewsModel;

    data.id = id;

    const businessViews = await removeBusinessViewsData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessViews) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businessViews;
};

export {
    getBusinessViewsController,
    addBusinessViewsController,
    updateBusinessViewsController,
    removeBusinessViewsController
}; 
