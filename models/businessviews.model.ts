import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';
import Businesses from './businesses.model';
import CategoriesModel from './categories.model';
import BusinessImagesModel from './businessimages.model';
import BusinessContactModel from './businesscontact.model';
import BusinessesModel from './businesses.model';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class BusinessViewsModel extends Model {

    public id?: string;
    public businessId?: number;
    public views?: number;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'businessViews';
    }


    // Uncomment for Column name change 'column_name' to a desired column name
    public static get idColumn(): string {
        return 'id';
    }

    public static get modifiers(): any {
        return {
            selectViews(builder): any {
                builder.select('views');
            },
            orderByViews(builder: Knex): any {
                builder.orderBy('views', 'desc');
            }
        };
    }

    public $beforeInsert(): void {
        this.createdAt = moment().toISOString(true);
    }


    public $beforeUpdate(): void {
        this.updatedAt = moment().toISOString(true);
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    // See http://json-schema.org/ for more info.

    /** An example of the Objection jsonSchema */
    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['businessId', 'views'],

            properties: {
                id: { type: 'integer' },
                parentId: { type: ['integer', 'null'] },
                businessId: { type: 'integer' },
                views: { type: 'integer' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }

    public static get relationMappings(): any {
        return {

            business: {
                relation: Model.HasOneRelation,

                modelClass: BusinessesModel,
                join: {
                    from: 'businessViews.businessId',
                    to: 'business.id'
                }
            },

            contact: {
                relation: Model.HasOneRelation,

                modelClass: BusinessContactModel,
                join: {
                    from: 'businessViews.businessId',
                    to: 'businessContact.businessId'
                }
            },

            images: {
                relation: Model.HasManyRelation,

                modelClass: BusinessImagesModel,
                join: {
                    from: 'businessViews.businessId',
                    to: 'businessImages.businessId'
                }
            },

            categories: {
                relation: Model.ManyToManyRelation,

                modelClass: CategoriesModel,
                join: {
                    from: 'businessViews.businessId',
                    through: {
                        from: 'businessCategories.businessId',
                        to: 'businessCategories.categoryId'
                    },
                    to: 'categories.id'
                }
            }
        };
    }
}

export default BusinessViewsModel;
