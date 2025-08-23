import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../app/app';

describe('E2E: auth', () => {
  it('POST /api/auth/login -> 422 on invalid payload', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: '' });
    expect(res.status).to.equal(422);
  });
});

