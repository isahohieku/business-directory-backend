import supertest from 'supertest';
import { expect } from 'chai';
import { app } from '../../../app/app';
import {
    validRegistrationDetails
} from '../../mock-data/user-mock-data';
import LoginModel from '../../../db/models/login.model';



const request = supertest(app);

let id: number;

describe('test authentication process - /api/auth/', (): void => {

    it('/api/auth/ - Valid registration detail', (done): void => {
        request
            .post('/api/auth/')
            .send(validRegistrationDetails)
            .set('Accept', 'application/json')
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
                expect(data).to.have.property('email').not.to.equal(null);

                return done();
            });
    });

    it('/api/auth/ - Valid but existing registration detail', (done): void => {
        request
            .post('/api/auth/')
            .send(validRegistrationDetails)
            .set('Accept', 'application/json')
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

    it('/api/auth/ - inValid registration detail', (done): void => {
        const invalidSignupDetail = {
            fullName: 0,
            email: 'hellothere',
            password: 'pass'
        };

        request
            .post('/api/auth/')
            .send(invalidSignupDetail)
            .set('Accept', 'application/json')
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

    it('/api/auth/login - Valid login detail', (done): void => {
        delete validRegistrationDetails.fullName;
        request
            .post('/api/auth/login')
            .send(validRegistrationDetails)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body).to.have.property('status').to.equal('success');
                expect(body).to.have.property('code').to.equal(200);
                expect(body).to.have.property('message').to.equal('');

                const { data } = body;

                expect(data).to.have.property('fullName').not.to.equal(null);
                expect(data).to.have.property('id').to.be.a('number');
                expect(data).to.have.property('email').not.to.equal(null);
                expect(data).to.have.property('token').not.to.equal(null);

                return done();
            });
    });

    it('/api/auth/login - Invalid login detail: invalid email', (done): void => {
        const invalidEmail = validRegistrationDetails;
        invalidEmail.email = 'heythere';
        request
            .post('/api/auth/login')
            .send(invalidEmail)
            .set('Accept', 'application/json')
            .expect(422)
            .end(async (err, res): Promise<void> => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body).to.have.property('status').to.equal('error');
                expect(body).to.have.property('code').to.equal(422);
                expect(body).to.have.property('message').not.equal('');

                await LoginModel.query().deleteById(id);

                return done();
            });
    });

    it('/api/auth/login - Invalid login detail: non existing user', (done): void => {
        const invalidEmail = {
            email: 'isahohieku@nonexisting.com',
            password: 'password'
        };
        request
            .post('/api/auth/login')
            .send(invalidEmail)
            .set('Accept', 'application/json')
            .expect(404)
            .end(async (err, res): Promise<void> => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body).to.have.property('status').to.equal('error');
                expect(body).to.have.property('code').to.equal(404);
                expect(body).to.have.property('message').not.equal('');

                await LoginModel.query().deleteById(id);

                return done();
            });
    });

    it('/api/auth/login - Wrong Password', (done): void => {
        const loginWithWrongPassword = {
            email: 'johndoe@email.com',
            password: 'pass'
        };

        request
            .post('/api/auth/login')
            .send(loginWithWrongPassword)
            .set('Accept', 'application/json')
            .expect(422)
            .end((err, res): void => {
                expect(err).to.be.null;
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body).to.have.property('status').to.equal('error');
                expect(body).to.have.property('code').to.equal(422);
                expect(body).to.have.property('message').not.equal('');
                expect(body).to.have.property('responseType').not.equal('');

                return done();
            });
    });
});