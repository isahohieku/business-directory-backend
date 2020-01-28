exports.up = function(knex) {
    return knex.schema.createTable('businessImages', function (table) {
        table.increments('id').primary();
        table.integer('businessId').notNullable().unsigned().references('id').inTable('business');
        table.string('imageUrl').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('businessImages');        
};