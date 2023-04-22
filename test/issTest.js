const { fetchMyIP } = require('../iss');
const { assert } = require('chai');

describe('iss', () => {
  it('returns an ip address', (done) => {
    fetchMyIP((error, ip) => {
      // we expect no error for this scenario
      assert.equal(error, null);
      const expectedIP = "184.145.7.53";
      // compare returned description
      assert.equal(expectedIP, ip);
      done();
    });
  });
});