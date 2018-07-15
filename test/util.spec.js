import Util from '../src/js/util';
import { expect } from 'chai';

describe('Util.toBoolean()', () => {

  it('should return the right bool when input is "true" or "false"', () => {
    expect(Util.toBoolean('true')).to.be.equal(true);
    expect(Util.toBoolean('TruE')).to.be.equal(true);
    expect(Util.toBoolean('false')).to.be.equal(false);
    expect(Util.toBoolean('FaLse')).to.be.equal(false);
  });

  it('should return the value when input is boolean', () => {
    expect(Util.toBoolean(true)).to.be.equal(true);
    expect(Util.toBoolean(false)).to.be.equal(false);
  });

  it('should return undefined when input is not a string', () => {
    expect(Util.toBoolean(['true'])).to.be.equal(void 0);
    expect(Util.toBoolean(1)).to.be.equal(void 0);
  });

});
