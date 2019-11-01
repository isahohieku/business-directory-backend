import { Request } from 'express';
import { messages } from '../../constants/messages.constants';
import { getCategoriesData, addCategoriesData, removeCategoriesData, updateCategoriesData } from './categories.data';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import CategoriesModel from '../../db/models/categories.model';

/**
 * @method getCategories to get a categories by a user
 */
const getCategoriesController = async (req: Request):
Promise<CategoriesModel | CategoriesModel[] | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: CategoriesModel = new CategoriesModel;

    data.id = id;

    const categories = await getCategoriesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!categories) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return categories;
};

/**
 * @method addCategoriesController is a demo method which should be changed (if need be)
 */
const addCategoriesController = async (req: Request): Promise<CategoriesModel | undefined | void> => {

    /**
     * @param name here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { name } = req.body;

    const data: CategoriesModel = new CategoriesModel;

    data.name = name;

    /**
     * @method addCategoriesData shoud also be changed to what is needed (expected)
     */
    const categories = await addCategoriesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });
    return categories;
};

/**
 * @method updateCategories to update a categories by a user
 */
const updateCategoriesController = async (req: Request): Promise<CategoriesModel | undefined | void> => {

    /**
     * @param id, @param name are expected to be a member of the @param req.body
     */
    const { id, name } = req.body;

    const data: CategoriesModel = new CategoriesModel;

    data.id = id;
    data.name = name;

    const categories = await updateCategoriesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!categories) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return categories;
};

/**
 * @method removeCategories to remove a categories by a user
 */
const removeCategoriesController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: CategoriesModel = new CategoriesModel;

    data.id = id;

    const categories = await removeCategoriesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!categories) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return categories;
};

export {
    getCategoriesController,
    addCategoriesController,
    updateCategoriesController,
    removeCategoriesController
}; 
