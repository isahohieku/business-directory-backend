import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class ContactModel extends Model {

    public id?: string;
    public authorId?: string;
    public fullName?: string;
    public title?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'contact';
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
    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['fullName', 'authorId'],

            properties: {
                id: { type: 'integer' },
                authorId: { type: 'integer' },
                fullName: { type: 'string', minLength: 1, maxLength: 255 },
                title: { type: 'string', minLength: 1, maxLength: 20 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default ContactModel;
