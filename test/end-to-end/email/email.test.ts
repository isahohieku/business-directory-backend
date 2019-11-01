import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import mockDb from 'mock-knex';
import Knex from 'knex';
import { knexConfig } from '../../../db/knexfile';
import { validEmailDetail, invalidEmailDetail, validUpdateEmailDetail } from '../../mock-data/email-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import EmailModel from '../../../db/models/email.model';
import { CustomError } from '../../../lib/custom.error';
import { messages } from '../../../constants/messages.constants';
import { codes } from '../../../constants/api_response_codes.constants';

const knex = Knex(knexConfig as Knex.Config);
const knexTracker = mockDb.getTracker();

const request = supertest(app);

let id: number;

describe('test email process - /api/email', (): void => {

    it('/api/email - With missing token', (done): void => {
        request
            .get('/api/email')
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


    it('/api/email - Valid email detail with invalid token', (done): void => {
        request
            .get('/api/email')
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

    describe('Email endpoint - /api/email', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/email - inValid email detail', (done): void => {
            request
                .post('/api/email')
                .set('Accept', 'application/json')
                .send(invalidEmailDetail)
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

        it('/api/email/ - Add a email', (done): void => {
            request
                .post('/api/email')
                .send(validEmailDetail)
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

        it('/api/email/ - Get all emails', (done): void => {
            request
                .get('/api/email/')
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

        it('/api/email/ - Get a email', (done): void => {
            request
                /** Add id to template literal */
                .get(`/api/email?id=${id}`)
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

        it('/api/email/ - Get a non existing email', (done): void => {
            request
                .get(`/api/email?id=-1`)
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

        it('/api/email/ - update a email', (done): void => {
            validUpdateEmailDetail.id = id;
            request
                .put('/api/email')
                .send(validUpdateEmailDetail)
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

        it('/api/email/ - update a non-existing email', (done): void => {
            validUpdateEmailDetail.id = -1;
            request
                .put('/api/email')
                .send(validUpdateEmailDetail)
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

        it('/api/email/ - update an email with missing id', (done): void => {
            validUpdateEmailDetail.id = -1;

            delete validUpdateEmailDetail.id;
            request
                .put('/api/email')
                .send(validUpdateEmailDetail)
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

        it('/api/email/ - Delete a email', (done): void => {
            request
                /** Add id to template literal */
                .delete(`/api/email?id=${id}`)
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

                    EmailModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/email/ - Delete a non existing email', (done): void => {
            request
                .delete(`/api/email?id=-1`)
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

                    EmailModel.query().delete().where({ id });

                    return done();
                });
        });

        // Failure test
        describe('Error in email', (): void => {
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

            it('/api/email - Error getting email(s) detail', (done): void => {
                request
                    .get('/api/email')
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

            it('/api/email/ - Error adding an email', (done): void => {
                request
                    .post('/api/email')
                    .send(validEmailDetail)
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

            it('/api/email/ - update a email', (done): void => {
                validUpdateEmailDetail.id = id;
                request
                    .put('/api/email')
                    .send(validUpdateEmailDetail)
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

            it('/api/email/ - Error deleting an email', (done): void => {
                request
                    /** Add id to template literal */
                    .delete(`/api/email?id=${id}`)
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
