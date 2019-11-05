import BusinessContactModel from '../db/models/businessContact.model';

/**
 * @param id is the id of businessContact passed into the @method getBusinessContactData
 * @method getBusinessContactData is a method to get a businessContact or businessContacts
 */
const getBusinessContactData
    = async (id: string): Promise<BusinessContactModel | BusinessContactModel[] | undefined> => {
        if (!id) {
            const result = await BusinessContactModel.query();
            return result;
        }

        const result = await BusinessContactModel.query().where({ id }).first();
        return result;
    };

/**
 * @param businessContact is the id of businessContact passed into the @method addBusinessContactData
 * @method addBusinessContactData is a method to add a businessContact 
 */
const addBusinessContactData
    = async (businessContact: BusinessContactModel): Promise<BusinessContactModel | undefined> => {
        const result = await BusinessContactModel.query().insert(businessContact).first();
        return result;
    };

/**
 * @param data is the data of businessContact passed into the @method updateBusinessContactData
 * @method updateBusinessContactData is a method to update a businessContact
 */
const updateBusinessContactData = async (data: BusinessContactModel): Promise<BusinessContactModel | undefined> => {
    let result = await BusinessContactModel.query().patchAndFetchById(Number(data.id), data);
    return result;
};

/**
 * @param businessContact is the id of businessContact passed into the @method removeBusinessContactData
 * @method removeBusinessContactData is a method to remove a businessContact
 */
const removeBusinessContactData = async (id: string): Promise<number | undefined> => {
    const result = await BusinessContactModel.query().delete().where({ id });
    return result;
};

export {
    getBusinessContactData,
    addBusinessContactData,
    updateBusinessContactData,
    removeBusinessContactData
};
