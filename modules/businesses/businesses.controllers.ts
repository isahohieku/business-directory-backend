import { Request } from 'express';
import { messages } from '../../constants/messages.constants';
import { getBusinessesData, addBusinessesData, removeBusinessesData, updateBusinessesData } from './businesses.data';
import { CustomError } from '../../lib/custom.error';
import {codes} from '../../constants/api_response_codes.constants';
import BusinessesModel from '../../db/models/businesses.model';

/**
 * @method getBusinesses to get a businesses by a user
 */
const getBusinessesController 
= async (req: Request): Promise<BusinessesModel | BusinessesModel[] | undefined | void> => {

    /**
     * @param id are expected to be a member of the @param req
     */
    const { id } = req.query;

    const data: BusinessesModel = new BusinessesModel;

    data.id = id;

    const businesses = await getBusinessesData(id)
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
const addBusinessesController = async(req: Request): Promise<BusinessesModel | undefined | void> => {

    /**
     * @param name are @param description here is expected to be a member of the @param req
     * Should be changed to the appropriate property expected
     */
    const { name, description } = req.body;

    const data = new BusinessesModel;

    data.name = name;
    data.description = description;
    
    /**
     * @method addBusinessesData shoud also be changed to what is needed (expected)
     */
    const businesses = await addBusinessesData(data)
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
