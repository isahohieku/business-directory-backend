import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class LoginModel extends Model {

    public id?: string;
    public email?: string;
    public fullName?: string;
    public password?: string;
    public createdAt?: string;
    public updatedAt?: string;
    public token?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'user';
    }

    // Uncomment for Column name change 'column_name' to a desired column name
    public static get idColumn(): string {
        return 'id';
    }

    public $beforeInsert(): void {
        this.createdAt = moment().toISOString(true);
    }

    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['email', 'password', 'fullName'],

            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                fullName: { type: 'string', minLength: 1, maxLength: 255 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default LoginModel;
