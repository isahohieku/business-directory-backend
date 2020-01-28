exports.up = function(knex) {
    return knex.schema.createTable('businessViews', function (table) {
        table.increments('id').primary();
        table.integer('businessId').notNullable().unsigned().references('id').inTable('business');
        table.integer('views').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('businessViews');        
};