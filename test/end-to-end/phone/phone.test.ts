import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import mockDb from 'mock-knex';
import Knex from 'knex';
import { knexConfig } from '../../../db/knexfile';
import { validPhoneDetail, invalidPhoneDetail, validUpdatePhoneDetail } from '../../mock-data/phone-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import PhoneModel from '../../../db/models/phone.model';
import { CustomError } from '../../../lib/custom.error';
import { messages } from '../../../constants/messages.constants';
import { codes } from '../../../constants/api_response_codes.constants';

const knex = Knex(knexConfig as Knex.Config);
const knexTracker = mockDb.getTracker();

const request = supertest(app);

let id: number;

describe('test phone process - /api/phone', (): void => {

    it('/api/phone - With missing token', (done): void => {
        request
            .get('/api/phone')
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

    it('/api/phone - Valid phone detail with invalid token', (done): void => {
        request
            .get('/api/phone')
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

    describe('Phone endpoint - /api/phone', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/phone - inValid phone detail', (done): void => {
            request
                .post('/api/phone')
                .set('Accept', 'application/json')
                .send(invalidPhoneDetail)
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

        it('/api/phone/ - Add a phone', (done): void => {
            request
                .post('/api/phone')
                .send(validPhoneDetail)
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

        it('/api/phone/ - Get all phones', (done): void => {
            request
                .get('/api/phone/')
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

        it('/api/phone/ - Get a phone', (done): void => {
            request
                /** Add id to template literal */
                .get(`/api/phone?id=${id}`)
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

        it('/api/phone/ - Get a non existing phone', (done): void => {
            request
                .get(`/api/phone?id=-1`)
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

        it('/api/phone/ - update a phone', (done): void => {
            validUpdatePhoneDetail.id = id;
            request
                .put('/api/phone')
                .send(validUpdatePhoneDetail)
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

        it('/api/phone/ - update a non-existing phone', (done): void => {
            validUpdatePhoneDetail.id = -1;
            request
                .put('/api/phone')
                .send(validUpdatePhoneDetail)
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

        it('/api/phone/ - update an phone with missing id', (done): void => {
            validUpdatePhoneDetail.id = -1;

            delete validUpdatePhoneDetail.id;
            request
                .put('/api/phone')
                .send(validUpdatePhoneDetail)
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

        it('/api/phone/ - Delete a phone', (done): void => {
            request
                /** Add id to template literal */
                .delete(`/api/phone?id=${id}`)
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

                    PhoneModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/phone/ - Delete a non existing phone', (done): void => {
            request
                .delete(`/api/phone?id=-1`)
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

                    PhoneModel.query().delete().where({ id });

                    return done();
                });
        });

        // Failure test
        describe('Error in phone', (): void => {
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

            it('/api/phone - Error getting phone(s) detail', (done): void => {
                request
                    .get('/api/phone')
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

            it('/api/phone/ - Error adding an phone', (done): void => {
                request
                    .post('/api/phone')
                    .send(validPhoneDetail)
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

            it('/api/phone/ - update a phone', (done): void => {
                validUpdatePhoneDetail.id = id;
                request
                    .put('/api/Phone')
                    .send(validUpdatePhoneDetail)
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

            it('/api/phone/ - Error deleting an phone', (done): void => {
                request
                    /** Add id to template literal */
                    .delete(`/api/phone?id=${id}`)
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
