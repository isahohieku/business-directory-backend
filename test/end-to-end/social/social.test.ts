import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import mockDb from 'mock-knex';
import Knex from 'knex';
import { knexConfig } from '../../../db/knexfile';
import { validSocialDetail, invalidSocialDetail, validUpdateSocialDetail } from '../../mock-data/social-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import SocialModel from '../../../db/models/social.model';
import { CustomError } from '../../../lib/custom.error';
import { messages } from '../../../constants/messages.constants';
import { codes } from '../../../constants/api_response_codes.constants';

const knex = Knex(knexConfig as Knex.Config);
const knexTracker = mockDb.getTracker();

const request = supertest(app);

let id: number;

describe('test social process - /api/social', (): void => {

    it('/api/social - With missing token', (done): void => {
        request
            .get('/api/social')
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


    it('/api/social - Valid social detail with invalid token', (done): void => {
        request
            .get('/api/social')
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

    describe('Social endpoint - /api/social', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/social - inValid social detail', (done): void => {
            request
                .post('/api/social')
                .set('Accept', 'application/json')
                .send(invalidSocialDetail)
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

        it('/api/social/ - Add a social', (done): void => {
            request
                .post('/api/social')
                .send(validSocialDetail)
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

        it('/api/social/ - Get all socials', (done): void => {
            request
                .get('/api/social/')
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

        it('/api/social/ - Get a social', (done): void => {
            request
                /** Add id to template literal */
                .get(`/api/social?id=${id}`)
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

        it('/api/social/ - Get a non existing social', (done): void => {
            request
                .get(`/api/social?id=-1`)
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

        it('/api/social/ - update a social', (done): void => {
            validUpdateSocialDetail.id = id;
            request
                .put('/api/social')
                .send(validUpdateSocialDetail)
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

        it('/api/social/ - update a non-existing social', (done): void => {
            validUpdateSocialDetail.id = -1;
            request
                .put('/api/social')
                .send(validUpdateSocialDetail)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
                .expect(500)
                .end((err, res): void => {
                    expect(err).to.be.null;
                    const { body } = res;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('status').to.equal('error');
                    expect(body).to.have.property('code').to.equal(500);
                    expect(body).to.have.property('message').not.to.equal('');

                    return done();
                });
        });

        it('/api/social/ - update an social with missing id', (done): void => {
            validUpdateSocialDetail.id = -1;

            delete validUpdateSocialDetail.id;
            request
                .put('/api/social')
                .send(validUpdateSocialDetail)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer auth')
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

        it('/api/social/ - Delete a social', (done): void => {
            request
                /** Add id to template literal */
                .delete(`/api/social?id=${id}`)
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

                    SocialModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/social/ - Delete a non existing social', (done): void => {
            request
                .delete(`/api/social?id=-1`)
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

                    SocialModel.query().delete().where({ id });

                    return done();
                });
        });

        // Failure test
        describe('Error in social', (): void => {
            beforeEach((): void => {
                // mock db
                mockDb.mock(knex);
                knexTracker.install();
                knexTracker.on('query', (query): void =>
                    query.reject(new CustomError(codes.DEFAULT_ERROR_CODE, messages.GENERIC, 422)));
            });

            afterEach((): void => {
                knexTracker.uninstall();
                mockDb.unmock(knex);
            });

            it('/api/social - Error getting social(s) detail', (done): void => {
                request
                    .get('/api/social')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer Auth')
                    .expect(500)
                    .end((err, res): void => {
                        expect(err).to.be.null;
                        const { body } = res;
                        expect(body).to.be.an('object');
                        expect(body).to.have.property('status').to.equal('error');
                        expect(body).to.have.property('code').to.equal(500);
                        expect(body).to.have.property('message').not.to.equal('');

                        return done();
                    });
            });

            it('/api/social/ - Error adding an social', (done): void => {
                request
                    .post('/api/social')
                    .send(validSocialDetail)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer auth')
                    .expect(500)
                    .end((err, res): void => {
                        expect(err).to.be.null;
                        const { body } = res;
                        expect(body).to.be.an('object');
                        expect(body).to.have.property('status').to.equal('error');
                        expect(body).to.have.property('code').to.equal(500);
                        expect(body).to.have.property('message').not.to.equal('');

                        /** Other expectations here */

                        return done();
                    });
            });

            it('/api/social/ - update a social', (done): void => {
                validUpdateSocialDetail.id = id;
                request
                    .put('/api/social')
                    .send(validUpdateSocialDetail)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer auth')
                    .expect(500)
                    .end((err, res): void => {
                        expect(err).to.be.null;
                        const { body } = res;
                        expect(body).to.be.an('object');
                        expect(body).to.have.property('status').to.equal('error');
                        expect(body).to.have.property('code').to.equal(500);
                        expect(body).to.have.property('message').not.to.equal('');

                        return done();
                    });
            });

            it('/api/social/ - Error deleting an social', (done): void => {
                request
                    /** Add id to template literal */
                    .delete(`/api/social?id=${id}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer auth')
                    .expect(500)
                    .end((err, res): void => {
                        expect(err).to.be.null;
                        const { body } = res;
                        expect(body).to.be.an('object');
                        expect(body).to.have.property('status').to.equal('error');
                        expect(body).to.have.property('code').to.equal(500);
                        expect(body).to.have.property('message').not.to.equal('');
                        expect(body).to.have.property('data');

                        return done();
                    });
            });
        });

    });

});
