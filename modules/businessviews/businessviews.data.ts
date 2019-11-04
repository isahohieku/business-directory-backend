import BusinessViewsModel from '../../db/models/businessViews.model';

/**
 * @param id is the id of businessViews passed into the @method getBusinessViewsData
 * @method getBusinessViewsData is a method to get a businessViews or businessViewss
 */
const getBusinessViewsData = async (id: string): Promise<BusinessViewsModel | BusinessViewsModel[] | undefined> => {
    if (!id) {
        const result = await BusinessViewsModel.query();
        return result;
    }

    const result = await BusinessViewsModel.query().where({ id }).first();
    return result;
};

/**
 * @param businessViews is the id of businessViews passed into the @method addBusinessViewsData
 * @method addBusinessViewsData is a method to add a businessViews 
 */
const addBusinessViewsData = async (businessViews: BusinessViewsModel): Promise<BusinessViewsModel | undefined> => {
    const result = await BusinessViewsModel.query().insert(businessViews).first();
    return result;
};

/**
 * @param data is the data of businessViews passed into the @method updateBusinessViewsData
 * @method updateBusinessViewsData is a method to update a businessViews
 */
const updateBusinessViewsData = async (data: BusinessViewsModel): Promise<BusinessViewsModel | undefined> => {
    console.log(data);
    let result = await BusinessViewsModel.query().where({ businessId: data.businessId }).increment('views', 1).first();
    return result;
};

/**
 * @param businessViews is the id of businessViews passed into the @method removeBusinessViewsData
 * @method removeBusinessViewsData is a method to remove a businessViews
 */
const removeBusinessViewsData = async (id: string): Promise<number | undefined> => {
    const result = await BusinessViewsModel.query().delete().where({ id });
    return result;
};

export { 
    getBusinessViewsData,
    addBusinessViewsData,
    updateBusinessViewsData,
    removeBusinessViewsData
};
