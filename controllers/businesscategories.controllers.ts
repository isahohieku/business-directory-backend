import { Request } from 'express';
import { messages } from '../constants/messages.constants';
import {
    getBusinessCategoriesData,
    addBusinessCategoriesData,
    removeBusinessCategoriesData, updateBusinessCategoriesData
} from '../data/businessCategories.data';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import BusinessCategoriesModel from '../models/businessCategories.model';

/**
 * @method getBusinessCategories to get a businessCategories by a user
 */
const getBusinessCategoriesController
    = async (req: Request): Promise<BusinessCategoriesModel | BusinessCategoriesModel[] | undefined | void> => {

        /**
         * @param id are expected to be a member of the @param req
         */
        const { id } = req.query;

        const data: BusinessCategoriesModel = new BusinessCategoriesModel;

        data.id = id;

        const businessCategories = await getBusinessCategoriesData(id)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });

        if (!businessCategories) {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
        }

        return businessCategories;
    };

/**
 * @method addBusinessCategoriesController is a demo method which should be changed (if need be)
 */
const addBusinessCategoriesController = async (req: Request): Promise<BusinessCategoriesModel | undefined | void> => {

    /**
     * @param businessId and @param categoryId here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { businessId, categoryId } = req.body;

    const data = new BusinessCategoriesModel;

    data.businessId = businessId;
    data.categoryId = categoryId;

    /**
     * @method addBusinessCategoriesData shoud also be changed to what is needed (expected)
     */
    const businessCategories = await addBusinessCategoriesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });
    return businessCategories;
};

/**
 * @method updateBusinessCategories to update a businessCategories by a user
 */
const updateBusinessCategoriesController
    = async (req: Request): Promise<BusinessCategoriesModel | undefined | void> => {

        /**
         * @param id and @param categoryId are expected to be a member of the @param req.body
         */
        const { id, categoryId } = req.body;

        const data: BusinessCategoriesModel = new BusinessCategoriesModel;

        data.id = id;

        if (categoryId) {
            data.categoryId = categoryId;
        }

        const businessCategories = await updateBusinessCategoriesData(data)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });

        if (!businessCategories) {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
        }

        return businessCategories;
    };

/**
 * @method removeBusinessCategories to remove a businessCategories by a user
 */
const removeBusinessCategoriesController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessCategoriesModel = new BusinessCategoriesModel;

    data.id = id;

    const businessCategories = await removeBusinessCategoriesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessCategories) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businessCategories;
};

export {
    getBusinessCategoriesController,
    addBusinessCategoriesController,
    updateBusinessCategoriesController,
    removeBusinessCategoriesController
}; 
