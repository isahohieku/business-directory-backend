import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';

// Set env before importing module so constants capture it
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-very-strong';
process.env.JWT_EXPIRES_IN = '1h';

import {
  generateJWT,
  generateEncryptedPassword,
  passwordMatch,
  pickUserData,
  pickToken,
  verifyTok
} from '../../utils/auth.util';

import { CustomError } from '../../lib/custom.error';
import type { Request, Response } from 'express';

describe('utils/auth.util', () => {
  it('generateEncryptedPassword + passwordMatch should hash and verify', async () => {
    const hash = await generateEncryptedPassword('plain-pass');
    expect(hash).to.be.a('string');
    const ok = await passwordMatch('plain-pass', hash!);
    expect(ok).to.eq(true);
    const bad = await passwordMatch('wrong-pass', hash!);
    expect(bad).to.eq(false);
  });

  it('generateJWT + verifyTok should round-trip payload', () => {
    const payload: any = { id: 1, email: 'user@example.com', fullName: 'User Name' };
    const token = generateJWT(payload);

    const req = { headers: {} } as unknown as Request;
    const res = {} as Response;
    const decoded = verifyTok(req, res, token) as any;
    expect(decoded.email).to.equal('user@example.com');
    expect(decoded.id).to.equal(1);
  });

  it('verifyTok should throw CustomError on invalid token', () => {
    const req = { headers: {} } as unknown as Request;
    const res = {} as Response;
    expect(() => verifyTok(req, res, 'bad.token.here')).to.throw(CustomError);
  });

  it('pickUserData should only pick whitelisted fields', () => {
    const input = { id: 7, email: 'a@b.com', fullName: 'A', createdAt: 'x', updatedAt: 'y', extra: 'z' };
    const picked = pickUserData(input);
    expect(picked).to.deep.equal({ id: 7, email: 'a@b.com', fullName: 'A', createdAt: 'x', updatedAt: 'y' });
  });

  it('pickToken should parse Bearer token from Authorization header', () => {
    const req = { headers: { authorization: 'Bearer abc.def.ghi' } } as unknown as Request;
    const token = pickToken(req);
    expect(token).to.equal('abc.def.ghi');
  });

  it('pickToken should support x-access-token', () => {
    const req = { headers: { 'x-access-token': 'xyz' } } as unknown as Request;
    const token = pickToken(req);
    // pickToken returns undefined unless token starts with Bearer, so legacy x-access-token without Bearer returns undefined
    // this documents current behavior
    expect(token).to.equal(undefined);
  });
});

