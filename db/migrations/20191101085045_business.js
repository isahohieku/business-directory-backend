
exports.up = function(knex) {
    return knex.schema.createTable('business', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('business');    
};
