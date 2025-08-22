
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('fullName').notNullable();
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
};
