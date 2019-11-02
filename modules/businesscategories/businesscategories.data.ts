import BusinessCategoriesModel from '../../db/models/businessCategories.model';

/**
 * @param id is the id of businessCategories passed into the @method getBusinessCategoriesData
 * @method getBusinessCategoriesData is a method to get a businessCategories or businessCategoriess
 */
const getBusinessCategoriesData
    = async (id: string): Promise<BusinessCategoriesModel | BusinessCategoriesModel[] | undefined> => {
        if (!id) {
            const result = await BusinessCategoriesModel.query();
            return result;
        }

        const result = await BusinessCategoriesModel.query().where({ id }).first();
        return result;
    };

/**
 * @param businessCategories is the id of businessCategories passed into the @method addBusinessCategoriesData
 * @method addBusinessCategoriesData is a method to add a businessCategories 
 */
const addBusinessCategoriesData
    = async (businessCategories: BusinessCategoriesModel): Promise<BusinessCategoriesModel | undefined> => {
        const result = await BusinessCategoriesModel.query().insert(businessCategories).first();
        return result;
    };

/**
 * @param data is the data of businessCategories passed into the @method updateBusinessCategoriesData
 * @method updateBusinessCategoriesData is a method to update a businessCategories
 */
const updateBusinessCategoriesData
    = async (data: BusinessCategoriesModel): Promise<BusinessCategoriesModel | undefined> => {
        let result = await BusinessCategoriesModel.query().patchAndFetchById(Number(data.id), data);
        return result;
    };

/**
 * @param businessCategories is the id of businessCategories passed into the @method removeBusinessCategoriesData
 * @method removeBusinessCategoriesData is a method to remove a businessCategories
 */
const removeBusinessCategoriesData = async (id: string): Promise<number | undefined> => {
    const result = await BusinessCategoriesModel.query().delete().where({ id });
    return result;
};

export {
    getBusinessCategoriesData,
    addBusinessCategoriesData,
    updateBusinessCategoriesData,
    removeBusinessCategoriesData
};
