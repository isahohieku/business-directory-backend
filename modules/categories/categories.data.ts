import CategoriesModel from '../../db/models/categories.model';

/**
 * @param id is the id of categories passed into the @method getCategoriesData
 * @method getCategoriesData is a method to get a categories or categoriess
 */
const getCategoriesData = async (id: string): Promise<CategoriesModel | CategoriesModel[] | undefined> => {
    if (!id) {
        const result = await CategoriesModel.query();
        return result;
    }

    const result = await CategoriesModel.query().where({ id }).first();
    return result;
};

/**
 * @param id is the id of categories passed into the @method getCategoriesData
 * @method getCategoriesData is a method to get a categories or categoriess
 */
const getCategoriesDataByValue = async (name: string): Promise<CategoriesModel | CategoriesModel[] | undefined> => {
    if (!name) {
        const result = await CategoriesModel.query();
        return result;
    }

    const result = await CategoriesModel.query().where({ name }).first();
    return result;
};

/**
 * @param categories is the id of categories passed into the @method addCategoriesData
 * @method addCategoriesData is a method to add a categories 
 */
const addCategoriesData = async (categories: CategoriesModel): Promise<CategoriesModel | undefined> => {
    const result = await CategoriesModel.query().insert(categories).first();
    return result;
};

/**
 * @param data is the data of categories passed into the @method updateCategoriesData
 * @method updateCategoriesData is a method to update a categories
 */
const updateCategoriesData = async (data: CategoriesModel): Promise<CategoriesModel | undefined> => {
    let result = await CategoriesModel.query().patchAndFetchById(Number(data.id), data);
    return result;
};

/**
 * @param categories is the id of categories passed into the @method removeCategoriesData
 * @method removeCategoriesData is a method to remove a categories
 */
const removeCategoriesData = async (id: string): Promise<number | undefined> => {
    const result = await CategoriesModel.query().delete().where({ id });
    return result;
};

export { 
    getCategoriesData,
    getCategoriesDataByValue,
    addCategoriesData,
    updateCategoriesData,
    removeCategoriesData
};
