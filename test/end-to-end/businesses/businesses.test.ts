import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import { validBusinessesDetail, invalidBusinessesDetail, validUpdateBusinessesDetail } from '../../mock-data/businesses-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import BusinessesModel from '../../../db/models/businesses.model';

const request = supertest(app);

let id: number;

describe('test businesses process - /api/businesses', (): void => {

    it('/api/businesses - With missing token', (done): void => {
        request
            .get('/api/businesses')
            .set('Accept', 'application/json')
            .expect(401)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;

                expect(body).to.have.property('status').to.equal('error');
                expect(body).to.have.property('code').to.equal(401);
                expect(body).to.have.property('message').to.contain('Token');
                expect(body).to.have.property('responseType');

                return done();
            });
    });


    it('/api/businesses - Valid businesses detail with invalid token', (done): void => {
        request
            .get('/api/businesses')
            .set('Accept', 'application/json')
            .set('Authorization', invalidToken)
            .expect(401)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body).to.have.property('status').to.equal('error');
                expect(body).to.have.property('code').to.equal(401);
                expect(body).to.have.property('message').not.to.equal('');

                return done();
            });
    });

    describe('Businesses endpoint - /api/businesses', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/businesses - inValid businesses detail', (done): void => {
            request
                .post('/api/businesses')
                .set('Accept', 'application/json')
                .send(invalidBusinessesDetail)
                .set('Authorization', 'Bearer Auth')
                .expect(422)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('error');
                    expect(body).to.have.property('code').to.equal(422);
                    expect(body).to.have.property('message').not.to.equal('');

                    return done();
                });
        });

        it('/api/businesses/ - Add a businesses', (done): void => {
            request
                .post('/api/businesses')
                .send(validBusinessesDetail)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(200)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('success');
                    expect(body).to.have.property('code').to.equal(200);
                    expect(body).to.have.property('message').not.to.equal('');

                    const { data } = body;
                    id = data.id;

                    /** Other expectations here */

                    return done();
                });
        });

        it('/api/businesses/ - Get all businessess', (done): void => {
            request
                .get('/api/businesses/')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(200)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('success');
                    expect(body).to.have.property('code').to.equal(200);
                    expect(body).to.have.property('message').to.equal('');

                    const { data } = body;

                    expect(data).to.be.an('array');

                    /** Other expectations here */

                    return done();
                });
        });

        it('/api/businesses/ - Get a businesses', (done): void => {
            request
                /** Add id to template literal */
                .get(/api/businesses?id=id)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(200)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('success');
                    expect(body).to.have.property('code').to.equal(200);
                    expect(body).to.have.property('message').to.equal('');

                    const { data } = body;

                    expect(data).to.be.an('object');

                    /** Other expectations goes in here */

                    return done();
                });
        });

        it('/api/businesses/ - Get a non existing businesses', (done): void => {
            request
                .get(/api/businesses?id=-1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(404)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('error');
                    expect(body).to.have.property('code').to.equal(404);
                    expect(body).to.have.property('message').not.to.equal('');

                    return done();
                });
        });

        it('/api/businesses/ - update a businesses', (done): void => {
            validUpdateBusinessesDetail.id = id;
            request
                .put('/api/businesses')
                .send(validUpdateBusinessesDetail)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(200)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('success');
                    expect(body).to.have.property('code').to.equal(200);
                    expect(body).to.have.property('message').not.to.equal('');

                    const { data } = body;
                    id = data.id;
                    
                    /** Other expectations go here */

                    return done();
                });
        });

        it('/api/businesses/ - Delete a businesses', (done): void => {
            request
                /** Add id to template literal */
                .delete(/api/businesses?id=id)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(200)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('success');
                    expect(body).to.have.property('code').to.equal(200);
                    expect(body).to.have.property('message').not.to.equal('');
                    expect(body).to.have.property('data');

                    const { data } = body;

                    expect(data).to.be.an('number');
                    expect(data).to.be.equal(1);

                    BusinessesModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/businesses/ - Delete a non existing businesses', (done): void => {
            request
                .delete(/api/businesses?id=-1)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(404)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('error');
                    expect(body).to.have.property('code').to.equal(404);
                    expect(body).to.have.property('message').not.to.equal('');
                    expect(body).to.have.property('data');

                    BusinessesModel.query().delete().where({ id });

                    return done();
                });
        });

    });

});
