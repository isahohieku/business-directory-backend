import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../app/app';

describe('E2E: health and readiness', () => {
  it('GET /health -> 200 ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ status: 'ok' });
  });

  it('GET /ready -> 200 or 503 depending on DB', async () => {
    const res = await request(app).get('/ready');
    expect([200, 503]).to.include(res.status);
  });
});

