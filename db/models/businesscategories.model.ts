import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class BusinessCategoriesModel extends Model {

    public id?: string;
    public email?: string;
    public name?: string;
    public password?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }


    // Table name is the only required property.
    public static get tableName(): string {
        return 'businessCategories';
    }


    // Uncomment for Column name change 'column_name' to a desired column name
    public static get idColumn(): string {
        return 'id';
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
    public static get jsonSchema (): {} {
        return {
            type: 'object',
            required: ['email', 'password', 'name'],

            properties: {
                id: {type: 'integer'},
                parentId: {type: ['integer', 'null']},
                email: {type: 'string', minLength: 1, maxLength: 255},
                password: {type: 'string', minLength: 1, maxLength: 255},
                name: {type: 'string', minLength: 1, maxLength: 255},
                age: {type: 'number'},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'},

                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.
                address: {
                    type: 'object',
                    properties: {
                        street: {type: 'string'},
                        city: {type: 'string'},
                        zipCode: {type: 'string'}
                    }
                }
            }
        };
    }
}

export default BusinessCategoriesModel;
