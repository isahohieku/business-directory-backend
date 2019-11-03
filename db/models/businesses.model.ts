import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class BusinessesModel extends Model {

    public id?: string;
    public description?: string;
    public name?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }


    // Table name is the only required property.
    public static get tableName(): string {
        return 'business';
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
            required: ['description', 'name'],

            properties: {
                id: {type: 'integer'},
                parentId: {type: ['integer', 'null']},
                description: {type: 'string', minLength: 0, maxLength: 255},
                name: {type: 'string', minLength: 1, maxLength: 255},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'}
            }
        };
    }
}

export default BusinessesModel;
