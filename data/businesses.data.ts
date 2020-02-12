import BusinessesModel from '../models/businesses.model';
import { transaction, Transaction } from 'objection';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';
import BusinessContactModel from '../models/businesscontact.model';
import BusinessCategoriesModel from '../models/businesscategories.model';
import BusinessImagesModel from '../models/businessimages.model';
import BusinessViewsModel from '../models/businessviews.model';
import CategoriesModel from '../models/categories.model';

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
            let result =
                await BusinessViewsModel.query()
                    .withGraphFetched
                    ('[business(selectSome), images(selectImageUrl), categories(selectCategoriesForMost)]')
                    .orderBy('views', 'DESC')
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
* @param id is the id of businesses passed into the @method getBusinessesData
* @method getBusinessesData is a method to get a businesses or businessess
*/
const getBusinessesMetaData =
    async (): Promise<undefined | any> => {

        let images = await BusinessImagesModel.query().count();
        let views = await BusinessViewsModel.query().sum('views');
        let businesses = await BusinessesModel.query().count();
        let categories = await CategoriesModel.query().count();

        const result = {
            images: images[0],
            views: views[0],
            businesses: businesses[0],
            categories: categories[0]
        };

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
                contact.businessId = businessBasic.id;
                views.businessId = businessBasic.id;
                views.views = 1;

                categories = categories.map((item): any => {
                    if (item.categoryId && businessBasic.id) {
                        item.businessId = businessBasic.id;
                    }
                    return item;
                });

                images = images.map((item): any => {
                    if (businessBasic.id) {
                        item.businessId = businessBasic.id;
                    }
                    return item;
                });
            }

            await BusinessContactModel.query(trx).insert(contact).first();
            await BusinessViewsModel.query(trx).insert(views).first();
            await BusinessCategoriesModel.query(trx).insertGraph(categories);
            await BusinessImagesModel.query(trx).insertGraph(images);

            let result =
                await BusinessesModel.query(trx).where('id', businessBasic.id)
                    .withGraphFetched
                    ('[images(selectImageUrl), views(selectViews), contact(selectSome), categories(selectCategories)]')
                    .first();
            console.log(result);
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

            await BusinessContactModel.query(trx).delete().where({ businessId: id });
            await BusinessViewsModel.query(trx).delete().where({ businessId: id });
            await BusinessCategoriesModel.query(trx).delete().where({ businessId: id });
            await BusinessImagesModel.query(trx).delete().where({ businessId: id });
            const result = await BusinessesModel.query(trx).delete().where({ id });


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
    getBusinessesMetaData,
    getBusinessDataByValue,
    addBusinessesData,
    updateBusinessesData,
    removeBusinessesData
};
