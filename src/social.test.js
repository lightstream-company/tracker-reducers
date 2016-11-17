const {expect} = require('chai');
const reducer =  require('./social');
const eventMapper = require('./eventMapper');
const linkedEvent = require('../sampleEvents/LINKED.json');
const expiredEvent = require('../sampleEvents/EXPIRED.json');

describe('social', () => {

  describe('event LINKED', () => {
    it('should link a new social account', () => {
      const state = reducer(undefined, eventMapper(linkedEvent));
      expect(state.twitter).to.be.deep.equal({});
      expect(state.facebook).to.have.property('10157105901095587');
    });
  });

  describe('event EXPIRED', () => {
    it('should unvalidate the account', () => {
      const state1 = reducer(undefined, eventMapper(linkedEvent));
      const state2 = reducer(state1, eventMapper(expiredEvent));
      expect(state1.facebook['10157105901095587']).to.have.property('valid', true);
      expect(state2.facebook['10157105901095587']).to.have.property('valid', false);
    });
  });

});
