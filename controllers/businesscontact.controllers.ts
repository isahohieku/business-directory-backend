import { Request } from 'express';
import { messages } from '../constants/messages.constants';
import { getBusinessContactData, 
    addBusinessContactData, removeBusinessContactData, updateBusinessContactData } from '../data/businessContact.data';
import { CustomError } from '../lib/custom.error';
import { codes } from '../constants/api_response_codes.constants';
import BusinessContactModel from '../db/models/businessContact.model';

/**
 * @method getBusinessContact to get a businessContact by a user
 */
const getBusinessContactController
    = async (req: Request): Promise<BusinessContactModel | BusinessContactModel[] | undefined | void> => {

        /**
         * @param id are expected to be a member of the @param req
         */
        const { id } = req.query;

        const data: BusinessContactModel = new BusinessContactModel;

        data.id = id;

        const businessContact = await getBusinessContactData(id)
            .catch((): void => {
                throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
            });

        if (!businessContact) {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
        }

        return businessContact;
    };

/**
 * @method addBusinessContactController is a demo method which should be changed (if need be)
 */
const addBusinessContactController = async (req: Request): Promise<BusinessContactModel | undefined | void> => {

    /**
     * @param businessId, @param website, @param phone and @param location here is expected to be a member 
     * of the @param req
     * Should be changed to the appropriate property expected
     */
    const { businessId, website, phone, location, email } = req.body;

    const data = new BusinessContactModel;
    data.businessId = businessId;
    data.website = website;
    data.phone = phone;
    data.location = location;
    data.email = email;

    /**
     * @method addBusinessContactData shoud also be changed to what is needed (expected)
     */
    const businessContact = await addBusinessContactData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });
    return businessContact;
};

/**
 * @method updateBusinessContact to update a businessContact by a user
 */
const updateBusinessContactController = async (req: Request): Promise<BusinessContactModel | undefined | void> => {

    /**
     * @param id, @param website and @param phone are expected to be a member of the @param req.body
     */
    const { id, website, phone, location  } = req.body;

    const data: BusinessContactModel = new BusinessContactModel;

    data.id = id;

    if (website) {
        data.website = website;
    }

    if (phone) {
        data.phone = phone;
    }

    if (location) {
        data.location = location;
    }

    const businessContact = await updateBusinessContactData(data)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessContact) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_NOT_UPDATED, 500);
    }

    return businessContact;
};

/**
 * @method removeBusinessContact to remove a businessContact by a user
 */
const removeBusinessContactController = async (req: Request): Promise<number | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessContactModel = new BusinessContactModel;

    data.id = id;

    const businessContact = await removeBusinessContactData(id)
        .catch((): void => {
            throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 500);
        });

    if (!businessContact) {
        throw new CustomError(codes.DEFAULT_ERROR_CODE, messages.ERROR_CONTACT_FOUND, 404);
    }

    return businessContact;
};

export {
    getBusinessContactController,
    addBusinessContactController,
    updateBusinessContactController,
    removeBusinessContactController
}; 
