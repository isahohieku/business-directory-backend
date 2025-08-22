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
        const message = missing.length === 1 
            ? `Missing environment variable ${missing[0]}`
            : `Missing environment variables ${missing.join(', ')}`;
        
        if (process.env.NODE_ENV === 'development') {
            console.warn(cowsay.say({
                text: `WARNING: ${message}`,
                e: "oO",
                T: "U "
            }));
            return; // Don't exit in development
        }
        
        throw new Error(message);
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
