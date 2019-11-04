import { Request } from 'express';
import { messages } from '../../constants/messages.constants';
import { getBusinessesData, addBusinessesData, removeBusinessesData, updateBusinessesData } from './businesses.data';
import { CustomError } from '../../lib/custom.error';
import { codes } from '../../constants/api_response_codes.constants';
import BusinessesModel from '../../db/models/businesses.model';
import BusinessContactModel from '../../db/models/businesscontact.model';
import BusinessCategoriesModel from '../../db/models/businesscategories.model';
import BusinessImagesModel from '../../db/models/businessimages.model';
import BusinessViewsModel from '../../db/models/businessviews.model';

/**
 * @method getBusinesses to get a businesses by a user
 */
const getBusinessesController
    = async (req: Request): Promise<BusinessesModel | BusinessesModel[] | undefined | void> => {

        /**
         * @param id are expected to be a member of the @param req
         */
        const { id, term } = req.query;

        const data: BusinessesModel = new BusinessesModel;

        data.id = id;
        data.name = term;

        let businesses;

        businesses = await getBusinessesData(id, term)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });

        if (!businesses) {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
        }

        return businesses;
    };

/**
 * @method addBusinessesController is a demo method which should be changed (if need be)
 */
const addBusinessesController = async (req: Request): Promise<BusinessesModel | undefined | void> => {

    /**
     * @param name are @param description here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { name, description, website, phone, location, email, categories, images } = req.body;

    // Meta Data
    const businessMeta = new BusinessesModel;

    businessMeta.name = name;
    businessMeta.description = description;

    // Contact Data
    const businessContact = new BusinessContactModel;

    businessContact.website = website;
    businessContact.phone = phone;
    businessContact.location = location;
    businessContact.email = email;

    // Categories
    const businessCategories: BusinessCategoriesModel[] = categories.map((item: any): any => {
        const businessCategory = new BusinessCategoriesModel;
        businessCategory.categoryId = item;
        return businessCategory;
    });

    // Images
    const businessImages: BusinessImagesModel[] = images.map((item: any): any => {
        const businessImage = new BusinessImagesModel;
        businessImage.imageUrl = item;
        return businessImage;
    });

    // Views
    const businessViews = new BusinessViewsModel;
    businessViews.views = 0;

    /**
     * @method addBusinessesbusinessMeta shoud also be changed to what is needed (expected)
     */
    const businesses =
        await addBusinessesData(businessMeta, businessContact, businessCategories, businessImages, businessViews)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });
    return businesses;
};

/**
 * @method updateBusinesses to update a businesses by a user
 */
const updateBusinessesController = async (req: Request): Promise<BusinessesModel | undefined | void> => {

    /**
     * @param A, @param B and @param C are expected to be a member of the @param req.body
     */
    const { id, name, description } = req.body;

    const data: BusinessesModel = new BusinessesModel;

    data.id = id;

    if (name) {
        data.name = name;
    }

    if (description) {
        data.description = description;
    }

    const businesses = await updateBusinessesData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businesses) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return businesses;
};

/**
 * @method removeBusinesses to remove a businesses by a user
 */
const removeBusinessesController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessesModel = new BusinessesModel;

    data.id = id;

    const businesses = await removeBusinessesData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businesses) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businesses;
};

export {
    getBusinessesController,
    addBusinessesController,
    updateBusinessesController,
    removeBusinessesController
}; 
