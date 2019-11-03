
exports.up = function(knex) {
    return knex.schema.createTable('businessContact', function (table) {
        table.increments('id').primary();
        table.integer('businessId').notNullable();
        table.string('website').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('location').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('businessContact');      
};
