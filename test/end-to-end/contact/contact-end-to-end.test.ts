import supertest from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { app } from '../../../app/app';
import mockDb from 'mock-knex';
import Knex from 'knex';
import { knexConfig } from '../../../db/knexfile';
import { validContactDetail, invalidContactDetail, validUpdateContactDetail } from '../../mock-data/contact-mock-data';
import { userData, invalidToken } from '../../mock-data/user-mock-data';
import ContactModel from '../../../db/models/contact.model';
import { CustomError } from '../../../lib/custom.error';
import { messages } from '../../../constants/messages.constants';
import { codes } from '../../../constants/api_response_codes.constants';

const knex = Knex(knexConfig as Knex.Config);
const knexTracker = mockDb.getTracker();

const request = supertest(app);

let id: number;

describe('test contact process - /api/contact', (): void => {

    it('/api/contact - With missing token', (done): void => {
        request
            .get('/api/contact')
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


    it('/api/contact - Valid contact detail with invalid token', (done): void => {
        request
            .get('/api/contact')
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

    describe('Contact endpoint - /api/contact', (): void => {

        let sandbox: sinon.SinonSandbox;
        before((): void => {
            sandbox = sinon.createSandbox();
            // Allows middle to always succeed
            sandbox.stub(jwt, 'verify').resolves(userData);
        });

        after((): void => {
            sandbox.restore();
        });

        it('/api/contact - inValid contact detail', (done): void => {
            request
                .post('/api/contact')
                .set('Accept', 'application/json')
                .send(invalidContactDetail)
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

        it('/api/contact/ - Add a contact', (done): void => {
            request
                .post('/api/contact')
                .send(validContactDetail)
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

                    expect(data).to.have.property('fullName').not.to.equal(null);
                    expect(data).to.have.property('id').to.be.a('number');
                    expect(data).to.have.property('title');
                    expect(data).to.have.property('authorId').to.be.a('number');
                    expect(data).to.have.property('createdAt').not.to.equal(null);

                    return done();
                });
        });

        it('/api/contact/ - Get all contacts', (done): void => {
            request
                .get('/api/contact/')
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

                    const aContact = data[0];

                    expect(aContact).to.have.property('id').to.be.a('number');
                    expect(aContact).to.have.property('authorId').to.be.a('number');
                    expect(aContact).to.have.property('fullName').to.be.a('string');
                    expect(aContact).to.have.property('title');
                    expect(aContact).to.have.property('createdAt').to.be.a('string');

                    return done();
                });
        });

        it('/api/contact/ - Get a contact', (done): void => {
            request
                .get(`/api/contact?id=${id}`)
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

                    expect(data).to.have.property('id').to.be.a('number');
                    expect(data).to.have.property('authorId').to.be.a('number');
                    expect(data).to.have.property('fullName').to.be.a('string');
                    expect(data).to.have.property('title');
                    expect(data).to.have.property('createdAt').to.be.a('string');

                    return done();
                });
        });

        it('/api/contact/ - Get a non existing contact', (done): void => {
            request
                .get(`/api/contact?id=-1`)
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

        it('/api/contact/ - update a contact', (done): void => {
            validUpdateContactDetail.id = id;
            request
                .put('/api/contact')
                .send(validUpdateContactDetail)
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

                    expect(data).to.have.property('fullName').not.to.equal(null);
                    expect(data).to.have.property('id').to.be.a('number');
                    expect(data).to.have.property('title');
                    expect(data).to.have.property('authorId').to.be.a('number');
                    expect(data).to.have.property('createdAt').not.to.equal(null);
                    expect(data).to.have.property('updatedAt').not.to.equal(null);

                    return done();
                });
        });

        it('/api/contact/ - update a non-existing contact', (done): void => {
            validUpdateContactDetail.id = -1;
            request
                .put('/api/contact')
                .send(validUpdateContactDetail)
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

        it('/api/contact/ - update an contact with missing id', (done): void => {
            validUpdateContactDetail.id = -1;

            delete validUpdateContactDetail.id;
            request
                .put('/api/contact')
                .send(validUpdateContactDetail)
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

        it('/api/contact/ - Delete a contact', (done): void => {
            request
                .delete(`/api/contact?id=${id}`)
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

                    ContactModel.query().delete().where({ id });

                    return done();
                });
        });

        it('/api/contact/ - Delete a non existing contact', (done): void => {
            request
                .delete(`/api/contact?id=-1`)
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

                    ContactModel.query().delete().where({ id });

                    return done();
                });
        });

        // Failure test
        describe('Error in contact', (): void => {
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

            it('/api/contact - Error getting contact(s) detail', (done): void => {
                request
                    .get('/api/contact')
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

            it('/api/contact/ - Error adding an contact', (done): void => {
                request
                    .post('/api/contact')
                    .send(validContactDetail)
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

            it('/api/contact/ - update a contact', (done): void => {
                validUpdateContactDetail.id = id;
                request
                    .put('/api/contact')
                    .send(validUpdateContactDetail)
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

            it('/api/contact/ - Error deleting an contact', (done): void => {
                request
                    /** Add id to template literal */
                    .delete(`/api/contact?id=${id}`)
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