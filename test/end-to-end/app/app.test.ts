import supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../../../app/app';

// const { activeUserData } = require('../../mock-data/user-mock-data');

const request = supertest(app);
const invalidRoute = -1;

describe('test routing process end-to-end', (): void => {

    describe('/api/', (): void => {
        it('/api/ - route not found', (done): void => {
            request
                .get('/api/' + invalidRoute)
                .set('Accept', 'application/json')
                .expect(404)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').equal('error');
                    expect(body).to.have.property('code').equal(404);
                    expect(body).to.have.property('message').not.equal('');
                    expect(body).to.have.property('responseType').not.equal('');
                    // console.log(res);
                    return done();
                });
        });
    });
});
