const bcrypt = require('bcrypt');

exports.seed = function (knex) {
    return knex('user').del().then(async() => {
        // Inserts seed entries
        const password = await bcrypt.hash('password', 10);
        return knex('user').insert([
            {
                email: 'johndoe@email.com',
                password,
                fullName: 'John Doe',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ]);
    }).catch((e) => {
        console.log(e);
    });
};
