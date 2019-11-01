import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import mockDb from 'mock-knex';
import Knex from 'knex';
import { knexConfig } from '../../../db/knexfile';
import {
    validOccupationDetail,
    invalidOccupationDetail,
    validUpdateOccupationDetail
} from '../../mock-data/occupation-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import OccupationModel from '../../../db/models/occupation.model';
import { CustomError } from '../../../lib/custom.error';
import { messages } from '../../../constants/messages.constants';
import { codes } from '../../../constants/api_response_codes.constants';

const knex = Knex(knexConfig as Knex.Config);
const knexTracker = mockDb.getTracker();

const request = supertest(app);

let id: number;

describe('test occupation process - /api/occupation', (): void => {

    it('/api/occupation - With missing token', (done): void => {
        request
            .get('/api/occupation')
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


    it('/api/occupation - Valid occupation detail with invalid token', (done): void => {
        request
            .get('/api/occupation')
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

    describe('Occupation endpoint - /api/occupation', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/occupation - inValid occupation detail', (done): void => {
            request
                .post('/api/occupation')
                .set('Accept', 'application/json')
                .send(invalidOccupationDetail)
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

        it('/api/occupation/ - Add a occupation', (done): void => {
            request
                .post('/api/occupation')
                .send(validOccupationDetail)
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

        it('/api/occupation/ - Get all occupations', (done): void => {
            request
                .get('/api/occupation/')
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

        it('/api/occupation/ - Get a occupation', (done): void => {
            request
                /** Add id to template literal */
                .get(`/api/occupation?id=${id}`)
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

        it('/api/occupation/ - Get a non existing occupation', (done): void => {
            request
                .get(`/api/occupation?id=-1`)
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

        it('/api/occupation/ - update a occupation', (done): void => {
            validUpdateOccupationDetail.id = id;
            request
                .put('/api/occupation')
                .send(validUpdateOccupationDetail)
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

        it('/api/occupation/ - update a non-existing occupation', (done): void => {
            validUpdateOccupationDetail.id = -1;
            request
                .put('/api/occupation')
                .send(validUpdateOccupationDetail)
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

        it('/api/occupation/ - update an occupation with missing id', (done): void => {
            validUpdateOccupationDetail.id = -1;

            delete validUpdateOccupationDetail.id;
            request
                .put('/api/occupation')
                .send(validUpdateOccupationDetail)
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

        it('/api/occupation/ - Delete a occupation', (done): void => {
            request
                /** Add id to template literal */
                .delete(`/api/occupation?id=${id}`)
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

                    OccupationModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/occupation/ - Delete a non existing occupation', (done): void => {
            request
                .delete(`/api/occupation?id=-1`)
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

                    OccupationModel.query().delete().where({ id });

                    return done();
                });
        });

        // Failure test
        describe('Error in Occupation', (): void => {
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

            it('/api/occupation - Error getting occupation(s) detail', (done): void => {
                request
                    .get('/api/occupation')
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

            it('/api/occupation/ - Error adding an occupation', (done): void => {
                request
                    .post('/api/occupation')
                    .send(validOccupationDetail)
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

            it('/api/occupation/ - update a occupation', (done): void => {
                validUpdateOccupationDetail.id = id;
                request
                    .put('/api/occupation')
                    .send(validUpdateOccupationDetail)
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

            it('/api/occupation/ - Error deleting an occupation', (done): void => {
                request
                    /** Add id to template literal */
                    .delete(`/api/occupation?id=${id}`)
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