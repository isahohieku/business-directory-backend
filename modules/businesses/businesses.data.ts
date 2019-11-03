import BusinessesModel from '../../db/models/businesses.model';
import { transaction, Transaction } from 'objection';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';
import BusinessContactModel from '../../db/models/businesscontact.model';
import BusinessCategoriesModel from '../../db/models/businesscategories.model';
import BusinessImagesModel from '../../db/models/businessimages.model';

const knex = Knex(knexConfig as Knex.Config);

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
const addBusinessesData = async (business: BusinessesModel,
    contact: BusinessContactModel, categories: BusinessCategoriesModel[],
    images: BusinessImagesModel[]): Promise<any | undefined> => {

    // console.log(contact, images, categories, business);
    // return;

    try {
        const res = await transaction(knex, async (trx: Transaction): Promise<any> => {
            const businessBasic = await BusinessesModel.query(trx).insert(business).first();
    
            console.log(businessBasic);
    
            if (businessBasic && businessBasic.id) {
                contact.businessId = parseInt(businessBasic.id, 10);
                categories = categories.map((item): any => {
                    if (item.categoryId && businessBasic.id) {
                        item.businessId = parseInt(businessBasic.id, 10);
                    }
                });
    
                images = images.map((item): any => {
                    if (businessBasic.id) {
                        item.businessId = parseInt(businessBasic.id, 10);
                    }
                });
            }
            const businessContact = await BusinessContactModel.query(trx).insert(contact).first();
            const businessCategories = await BusinessContactModel.query(trx).insertGraph(categories).first();
            const businessImages = await BusinessContactModel.query(trx).insertGraph(images).first();
    
            const result = {
                businessBasic,
                businessContact,
                businessCategories,
                businessImages
            };
    
            return result;
        });
    
        return res;
    } catch(e) {
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
    const result = await BusinessesModel.query().delete().where({ id });
    return result;
};

export {
    getBusinessesData,
    addBusinessesData,
    updateBusinessesData,
    removeBusinessesData
};
