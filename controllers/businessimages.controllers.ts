import { Request } from 'express';
import { messages } from '../constants/messages.constants';
import { getBusinessImagesData, 
    addBusinessImagesData, removeBusinessImagesData, updateBusinessImagesData } from '../data/businessimages.data';
import { CustomError } from '../lib/custom.error';
import {codes} from '../constants/api_response_codes.constants';
import BusinessImagesModel from '../db/models/businessImages.model';

/**
 * @method getBusinessImages to get a businessImages by a user
 */
const getBusinessImagesController 
= async (req: Request): Promise<BusinessImagesModel | BusinessImagesModel[] | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessImagesModel = new BusinessImagesModel;

    data.id = id;

    const businessImages = await getBusinessImagesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessImages) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businessImages;
};

/**
 * @method addBusinessImagesController is a demo method which should be changed (if need be)
 */
const addBusinessImagesController = async(req: Request): Promise<BusinessImagesModel | undefined | void> => {

    /**
     * @param businessId and @param imageUrl here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { businessId, imageUrl } = req.body;

    const data = new BusinessImagesModel;

    data.businessId = businessId;
    data.imageUrl = imageUrl;
    
    /**
     * @method addBusinessImagesData shoud also be changed to what is needed (expected)
     */
    const businessImages = await addBusinessImagesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });
    return businessImages;
};

/**
 * @method updateBusinessImages to update a businessImages by a user
 */
const updateBusinessImagesController = async (req: Request): Promise<BusinessImagesModel | undefined | void> => {

    /**
     * @param id and @param imageUrl are expected to be a member of the @param req.body
     */
    const { id, imageUrl } = req.body;

    const data: BusinessImagesModel = new BusinessImagesModel;

    data.id = id;

    if (imageUrl) {
        data.imageUrl = imageUrl;
    }

    const businessImages = await updateBusinessImagesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessImages) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return businessImages;
};

/**
 * @method removeBusinessImages to remove a businessImages by a user
 */
const removeBusinessImagesController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessImagesModel = new BusinessImagesModel;

    data.id = id;

    const businessImages = await removeBusinessImagesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessImages) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businessImages;
};

export { 
    getBusinessImagesController,
    addBusinessImagesController,
    updateBusinessImagesController,
    removeBusinessImagesController
}; 
