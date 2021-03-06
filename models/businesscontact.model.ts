import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class BusinessContactModel extends Model {

    public id?: string;
    public businessId?: number;
    public website?: string;
    public phone?: string;
    public email?: string;
    public location?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }


    // Table name is the only required property.
    public static get tableName(): string {
        return 'businessContact';
    }


    // Uncomment for Column name change 'column_name' to a desired column name
    public static get idColumn(): string {
        return 'id';
    }

    public static get modifiers(): any {
        return {
            selectSome(builder): any {
                builder.select('website', 'email', 'phone', 'location');
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
    public static get jsonSchema (): {} {
        return {
            type: 'object',
            required: ['businessId', 'website', 'phone', 'location', 'email'],

            properties: {
                id: {type: 'integer'},
                parentId: {type: ['integer', 'null']},
                businessId: {type: 'integer'},
                website: {type: 'string', minLength: 1, maxLength: 255},
                phone: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string', minLength: 1, maxLength: 255},
                location: {type: 'string', minLength: 1, maxLength: 255},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'}
            }
        };
    }
}

export default BusinessContactModel;
