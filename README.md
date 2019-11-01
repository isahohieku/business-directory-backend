
# This is a simple nodeJS backend app for a Business deirectory


## Start Using application
Run `npm install` or `npm i` to install dependencies


## Create a .env file at the root folder with the following variable
`PORT`

`LOG_LEVEL` - This should be `info`

`NODE_ENV` - This should be `development` or what ever environment you want to work on.

`DB_NAME`

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`

`JWT_SECRET`

## Make a Knex Migration
Run `npm run make-js` `name of make-file` to create a migration.

The knex file associated to this command is a ***.js*** file because ***Knexjs*** is still having issues getting the ***.ts*** knex file to be stable on the latest version it released while this project was created.

> However, there is a migration of the ***user*** table in the ***migration*** folder

## Migration to the latest
Run `npm run migrate-js` to migrate to the latest migration.

## Rollback Migration
Run `npm run rollback-js` to rollback migration.

## Make Seed
Run `npm run seed:make-js` to generate a seed ***Template*** which a user would update to seed ***Table(s)*** in the ***Database***.

## Seed
Run `npm run seed:run-js` to seed ***Table(s)*** in the ***Database***.

## Switch to using knexfile.ts in app
Run `npm run waste` to rename ***knexfile.js***. This would allow KnexJS to use ***knexfile.ts*** in the app.

## Switch to using knexfile.js for migrations and its likes
Run `npm run revamp` to rename ***knexfile.ts***. This would allow KnexJS to use ***knexfile.js*** in the app.

## Generate a module
Run `npm run module` `module name` to generate a module.
A module comprise of the following file(s): 
- **module_name.controller.ts**
- **module_name.data.ts**
- **module_name.service.ts**
- **module_name.validators.ts**

## Generate a model
Run `npm run model` `model name` to generate a model.
A model comprise of the following file(s): 
- **model_name.model.ts**

## Start app in development mode
Run `npm run dev` to start application in ***development*** mode (**windows OS**).
Run `npm run dev:mac` to start application in ***development*** mode (**Mac OS**).

> The Mac OS ***command*** is to enable ***Debug*** log as expected.

## Build app for production
Run `npm run prod` to build app for production.

## Start Application in production environment
Run `npm start` to start the application.

## Run app test coverage
Run `npm run test` to run application test coverage.