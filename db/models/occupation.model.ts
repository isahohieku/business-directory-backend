import { Model } from 'objection';
import moment from 'moment';
import Knex from 'knex';
import { knexConfig } from '../../db/knexfile';

const knex = Knex(knexConfig as Knex.Config);
Model.knex(knex);

class OccupationModel extends Model {

    public id?: string;
    public contactId?: string;
    public position?: string;
    public workPlace?: string;
    public createdAt?: string;
    public updatedAt?: string;

    public constructor() {
        super();
    }


    // Table name is the only required property.
    public static get tableName(): string {
        return 'occupation';
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

    /** An example of the Objection jsonSchema */
    public static get jsonSchema(): {} {
        return {
            type: 'object',
            required: ['contactId', 'workPlace', 'position'],

            properties: {
                id: { type: 'integer' },
                contactId: { type: 'integer' },
                workPlace: { type: 'string', minLength: 1, maxLength: 255 },
                position: { type: 'string', minLength: 1, maxLength: 255 },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        };
    }
}

export default OccupationModel;
