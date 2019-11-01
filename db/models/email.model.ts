import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class EmailModel extends Model {

    public id?: string;
    public email?: string;
    public contactId?: string;
    public type?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'email';
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

    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['email', 'contactId'],

            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                contactId: { type: 'string', minLength: 1, maxLength: 255 },
                type: { type: 'string', minLength: 1, maxLength: 255 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default EmailModel;
