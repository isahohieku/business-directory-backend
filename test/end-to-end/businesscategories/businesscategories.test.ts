import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import { validBusinessCategoriesDetail, invalidBusinessCategoriesDetail, validUpdateBusinessCategoriesDetail } from '../../mock-data/businessCategories-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import BusinessCategoriesModel from '../../../db/models/businessCategories.model';

const request = supertest(app);

let id: number;

describe('test businessCategories process - /api/businessCategories', (): void => {

    it('/api/businessCategories - With missing token', (done): void => {
        request
            .get('/api/businessCategories')
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


    it('/api/businessCategories - Valid businessCategories detail with invalid token', (done): void => {
        request
            .get('/api/businessCategories')
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

    describe('BusinessCategories endpoint - /api/businessCategories', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/businessCategories - inValid businessCategories detail', (done): void => {
            request
                .post('/api/businessCategories')
                .set('Accept', 'application/json')
                .send(invalidBusinessCategoriesDetail)
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

        it('/api/businessCategories/ - Add a businessCategories', (done): void => {
            request
                .post('/api/businessCategories')
                .send(validBusinessCategoriesDetail)
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

        it('/api/businessCategories/ - Get all businessCategoriess', (done): void => {
            request
                .get('/api/businessCategories/')
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

        it('/api/businessCategories/ - Get a businessCategories', (done): void => {
            request
                /** Add id to template literal */
                .get(/api/businessCategories?id=id)
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

        it('/api/businessCategories/ - Get a non existing businessCategories', (done): void => {
            request
                .get(/api/businessCategories?id=-1)
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

        it('/api/businessCategories/ - update a businessCategories', (done): void => {
            validUpdateBusinessCategoriesDetail.id = id;
            request
                .put('/api/businessCategories')
                .send(validUpdateBusinessCategoriesDetail)
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

        it('/api/businessCategories/ - Delete a businessCategories', (done): void => {
            request
                /** Add id to template literal */
                .delete(/api/businessCategories?id=id)
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

                    BusinessCategoriesModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/businessCategories/ - Delete a non existing businessCategories', (done): void => {
            request
                .delete(/api/businessCategories?id=-1)
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

                    BusinessCategoriesModel.query().delete().where({ id });

                    return done();
                });
        });

    });

});
