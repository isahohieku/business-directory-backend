import { expect } from 'chai';
import * as winston from 'winston';

// Stub Console transport add to avoid noisy console during tests
import * as loggerModule from '../../utils/logger';

describe('utils/logger', () => {
  it('should log info without throwing', () => {
    expect(() => loggerModule.logger('test', 'hello world')).to.not.throw();
  });

  it('should log error without throwing', () => {
    expect(() => loggerModule.logger('test', 'boom', 'error')).to.not.throw();
  });
});

