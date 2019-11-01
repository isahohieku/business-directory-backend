import { expect } from 'chai';
import { knexConfig, development, test } from '../../db/knexfile';

const NODE_ENV = process.env.NODE_ENV;

describe('Test knex configuration', (): void => {
    describe('test on development environment', (): void => {
        before((): void => {
            process.env.NODE_ENV = 'development';
        });

        after((): void => {
            process.env.NODE_ENV = NODE_ENV;
        });
        it('test development environment against configuration', (done): void => {
            expect(knexConfig).to.deep.equal(development);
            done();
        });
    });

    // describe('test on test environment', (): void => {
    //     before((): void => {
    //         process.env.NODE_ENV = 'test';
    //     });

    //     after((): void => {
    //         process.env.NODE_ENV = NODE_ENV;
    //     });
    //     it('test the test environment against configuration', (done): void => {
    //         expect(knexConfig).to.deep.equal(test);
    //         done();
    //     });
    // });
});