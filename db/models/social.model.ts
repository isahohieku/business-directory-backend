import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class SocialModel extends Model {

    public id?: string;
    public type?: string;
    public handle?: string;
    public contactId?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }

    // Table name is the only required property.
    public static get tableName(): string {
        return 'socials';
    }

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
            required: ['contactId', 'handle', 'type'],

            properties: {
                id: { type: 'integer' },
                type: { type: 'string', minLength: 1, maxLength: 255 },
                handle: { type: 'string', minLength: 1, maxLength: 255 },
                contactId: { type: 'integer' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default SocialModel;
