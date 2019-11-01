'use strict';

require('dotenv').config();
const cowsay = require('cowsay');

const checkVariables = (variables) => {
    const missing = [];

    variables.forEach(variable => {
        if (process.env[variable] === undefined) {
            missing.push(variable);
        }
    });

    if (missing.length) {
        if (missing.length === 1) {
            throw new Error(`Missing environment variable ${missing[0]}`);
        }
        throw new Error(`Missing environment variables ${missing.join(', ')}`);
    }
};

try {
    checkVariables(process.argv.slice(2));
} catch (err) {
    console.error(cowsay.say({
        text: err.message
    }));

    process.exit(1);
}
