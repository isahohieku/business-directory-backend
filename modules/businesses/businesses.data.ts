import BusinessesModel from '../../db/models/businesses.model';

/**
 * @param id is the id of businesses passed into the @method getBusinessesData
 * @method getBusinessesData is a method to get a businesses or businessess
 */
const getBusinessesData = async (id: string): Promise<BusinessesModel | BusinessesModel[] | undefined> => {
    if (!id) {
        const result = await BusinessesModel.query();
        return result;
    }

    const result = await BusinessesModel.query().where({ id }).first();
    return result;
};

/**
 * @param businesses is the id of businesses passed into the @method addBusinessesData
 * @method addBusinessesData is a method to add a businesses 
 */
const addBusinessesData = async (businesses: BusinessesModel): Promise<BusinessesModel | undefined> => {
    const result = await BusinessesModel.query().insert(businesses).first();
    return result;
};

/**
 * @param data is the data of businesses passed into the @method updateBusinessesData
 * @method updateBusinessesData is a method to update a businesses
 */
const updateBusinessesData = async (data: BusinessesModel): Promise<BusinessesModel | undefined> => {
    let result = await BusinessesModel.query().patchAndFetchById(Number(data.id), data);
    return result;
};

/**
 * @param businesses is the id of businesses passed into the @method removeBusinessesData
 * @method removeBusinessesData is a method to remove a businesses
 */
const removeBusinessesData = async (id: string): Promise<number | undefined> => {
    const result = await BusinessesModel.query().delete().where({ id });
    return result;
};

export { 
    getBusinessesData,
    addBusinessesData,
    updateBusinessesData,
    removeBusinessesData
};
