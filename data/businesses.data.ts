import BusinessesModel from '../models/businesses.model';
import { transaction, Transaction } from 'objection';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';
import BusinessContactModel from '../models/businesscontact.model';
import BusinessCategoriesModel from '../models/businesscategories.model';
import BusinessImagesModel from '../models/businessimages.model';
import BusinessViewsModel from '../models/businessviews.model';

const knex = Knex(knexConfig as Knex.Config);

/**
 * @param id is the id of businesses passed into the @method getBusinessesData
 * @method getBusinessesData is a method to get a businesses or businessess
 */
const getBusinessesData =
    async (queries): Promise<BusinessesModel | BusinessesModel[] | undefined | any[]> => {

        /**
         * @param id are expected to be a member of the @param req
         */
        const { id, term, sort } = queries;

        const data: BusinessesModel = new BusinessesModel;

        data.id = id;
        data.name = term;
        if (!id && !term && !sort) {
            let businessMetas =
                await BusinessesModel.query()
                    .withGraphFetched
                    ('[images(selectImageUrl), views(selectViews), contact(selectSome), categories(selectCategories)]');

            return businessMetas;
        }

        if (term) {
            const businessMetas = await BusinessesModel.query();

            let result: BusinessesModel[] = [];
            if (businessMetas.length) {
                result = businessMetas.filter((item: any): any => item.name.toLowerCase().includes(term.toLowerCase()));
            }
            return result;
        }

        if (sort === 'recent') {
            let result =
                await BusinessesModel.query()
                    .withGraphFetched
                    ('[images(selectImageUrl), views(selectViews), categories(selectCategoriesForMost)]')
                    .orderBy('createdAt', 'DESC')
                    .limit(4);
            return result;
        }

        if (sort === 'views') {
            console.log('yes');
            let result =
                await BusinessesModel.query()
                    .withGraphFetched
                    ('[images(selectImageUrl), views(orderByViews, selectViews), categories(selectCategoriesForMost)]')
                    .limit(4);
            return result;
        }

        let result =
            await BusinessesModel.query().where('id', id)
                .withGraphFetched
                ('[images(selectImageUrl), views(selectViews), contact(selectSome), categories(selectCategories)]')
                .first();
        return result;
    };

/**
* @param id is the id of businesses passed into the @method getBusinessesData
* @method getBusinessesData is a method to get a businesses or businessess
*/
const getRecentBusinessesData =
    async (): Promise<BusinessesModel | BusinessesModel[] | undefined | any[]> => {

        let result =
            await BusinessesModel.query()
                .withGraphFetched
                ('[images(selectImageUrl), views(selectViews), categories(selectCategoriesForMost)]')
                .orderBy('createdAt', 'DESC')
                .limit(4);
        return result;
    };

/**
 * @param name is the id of businesses passed into the @method getBusinessesData
 * @method getBusinessesData is a method to get a businesses or businessess
 */
const getBusinessDataByValue =
    async (name: string): Promise<BusinessesModel | BusinessesModel[] | undefined> => {
        if (name) {
            const result1 = await BusinessesModel.query();

            let result: BusinessesModel[] = [];
            if (result1.length) {
                result = result1.filter((item): any => {
                    if (item.name) {
                        return item.name.toLowerCase().includes(name.toLowerCase());
                    }
                });
            }
            return result;
        }
    };

/**
 * @param businesses is the id of businesses passed into the @method addBusinessesData
 * @method addBusinessesData is a method to add a businesses 
 */
const addBusinessesData = async (business: BusinessesModel,
    contact: BusinessContactModel, categories: BusinessCategoriesModel[],
    images: BusinessImagesModel[], views: BusinessViewsModel): Promise<any | undefined> => {

    try {
        const res = await transaction(knex, async (trx: Transaction): Promise<any> => {
            const businessBasic = await BusinessesModel.query(trx).insert(business).first();

            if (businessBasic && businessBasic.id) {
                contact.businessId = parseInt(businessBasic.id, 10);
                views.businessId = parseInt(businessBasic.id, 10);
                views.views = 1;

                categories = categories.map((item): any => {
                    if (item.categoryId && businessBasic.id) {
                        item.businessId = parseInt(businessBasic.id, 10);
                    }
                    return item;
                });

                images = images.map((item): any => {
                    if (businessBasic.id) {
                        item.businessId = parseInt(businessBasic.id, 10);
                    }
                    return item;
                });
            }
            const businessContact = await BusinessContactModel.query(trx).insert(contact).first();
            const businessViews = await BusinessViewsModel.query(trx).insert(views).first();
            const businessCategories = await BusinessCategoriesModel.query(trx).insertGraph(categories);
            const businessImages = await BusinessImagesModel.query(trx).insertGraph(images);

            const result = {
                businessBasic,
                businessContact,
                businessCategories,
                businessImages,
                businessViews
            };

            return result;
        });

        return res;
    } catch (e) {
        console.log(e);
    }

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
    try {
        const res = await transaction(knex, async (trx: Transaction): Promise<any> => {
            const result = await BusinessesModel.query().delete().where({ id });

            await BusinessContactModel.query(trx).delete().where({ businessId: id });
            await BusinessViewsModel.query(trx).delete().where({ businessId: id });
            await BusinessCategoriesModel.query(trx).delete().where({ businessId: id });
            await BusinessImagesModel.query(trx).delete().where({ businessId: id });

            return result;
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

export {
    getBusinessesData,
    getRecentBusinessesData,
    getBusinessDataByValue,
    addBusinessesData,
    updateBusinessesData,
    removeBusinessesData
};
