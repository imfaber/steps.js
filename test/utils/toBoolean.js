import toBoolean from '../../src/js/utils/toBoolean';
import { expect } from 'chai';

describe('toBoolean()', () => {

  it('should return the right bool when input is "true" or "false"', () => {
    expect(toBoolean('true')).to.be.equal(true);
    expect(toBoolean('TruE')).to.be.equal(true);
    expect(toBoolean('false')).to.be.equal(false);
    expect(toBoolean('FaLse')).to.be.equal(false);
  });

  it('should return the value when input boolean', () => {
    expect(toBoolean(true)).to.be.equal(true);
    expect(toBoolean(false)).to.be.equal(false);
  });

  it('should return undefined when input is not a string', () => {
    expect(toBoolean(['true'])).to.be.equal(void 0);
    expect(toBoolean(1)).to.be.equal(void 0);
  });

});