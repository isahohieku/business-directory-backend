import BusinessesModel from '../../db/models/businesses.model';
import { transaction, Transaction } from 'objection';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';
import BusinessContactModel from '../../db/models/businesscontact.model';
import BusinessCategoriesModel from '../../db/models/businesscategories.model';
import BusinessImagesModel from '../../db/models/businessimages.model';
import CategoriesModel from '../../db/models/categories.model';
import BusinessViewsModel from '../../db/models/businessviews.model';

const knex = Knex(knexConfig as Knex.Config);

/**
 * @param id is the id of businesses passed into the @method getBusinessesData
 * @method getBusinessesData is a method to get a businesses or businessess
 */
const getBusinessesData = async (id: string): Promise<BusinessesModel | BusinessesModel[] | undefined | any[]> => {
    if (!id) {
        const businessMetas = await BusinessesModel.query()
            .join('businessContact', 'business.id', '=', 'businessContact.businessId')
            .join('businessViews', 'business.id', '=', 'businessViews.businessId')
            .select(
                // Business
                'business.id',
                'business.name',
                'business.description',
                'business.createdAt',
                // Contact
                'businessContact.website',
                'businessContact.email',
                'businessContact.phone',
                'businessContact.location',
                // Views
                'businessViews.views'
            );
        return businessMetas;

    }

    const businessMeta = await BusinessesModel.query().where({ id }).first();
    const businessContact = await BusinessContactModel.query().where({ businessId: id }).first();
    const businessCategories = await BusinessCategoriesModel.query().where({ businessId: id });
    const businessImages = await BusinessImagesModel.query().where({ businessId: id });

    const categories: Promise<CategoriesModel | undefined>[] =
        businessCategories.map(async (item): Promise<CategoriesModel | undefined> => {
            const res = await CategoriesModel.query().where({ id: item.categoryId }).first();
            if (res) {
                return res;
            }
        });

    const result = {
        ...businessMeta,
        ...businessContact,
        ...categories,
        ...businessImages
    };

    // console.log(result);
    return result;
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
    addBusinessesData,
    updateBusinessesData,
    removeBusinessesData
};
