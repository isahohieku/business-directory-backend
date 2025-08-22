import BusinessImagesModel from '../models/businessimages.model';

/**
 * @param id is the id of businessImages passed into the @method getBusinessImagesData
 * @method getBusinessImagesData is a method to get a businessImages or businessImagess
 */
const getBusinessImagesData = async (id: string): Promise<BusinessImagesModel | BusinessImagesModel[] | undefined> => {
    if (!id) {
        const result = await BusinessImagesModel.query();
        return result;
    }

    const result = await BusinessImagesModel.query().where({ id }).first();
    return result;
};

/**
 * @param businessImages is the id of businessImages passed into the @method addBusinessImagesData
 * @method addBusinessImagesData is a method to add a businessImages 
 */
const addBusinessImagesData = async (businessImages: BusinessImagesModel): Promise<BusinessImagesModel | undefined> => {
    const result = await BusinessImagesModel.query().insert(businessImages).first();
    return result;
};

/**
 * @param data is the data of businessImages passed into the @method updateBusinessImagesData
 * @method updateBusinessImagesData is a method to update a businessImages
 */
const updateBusinessImagesData = async (data: BusinessImagesModel): Promise<BusinessImagesModel | undefined> => {
    let result = await BusinessImagesModel.query().patchAndFetchById(Number(data.id), data);
    return result;
};

/**
 * @param businessImages is the id of businessImages passed into the @method removeBusinessImagesData
 * @method removeBusinessImagesData is a method to remove a businessImages
 */
const removeBusinessImagesData = async (id: string): Promise<number | undefined> => {
    const result = await BusinessImagesModel.query().delete().where({ id });
    return result;
};

export { 
    getBusinessImagesData,
    addBusinessImagesData,
    updateBusinessImagesData,
    removeBusinessImagesData
};
