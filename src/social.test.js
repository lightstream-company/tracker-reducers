const {expect} = require('chai');
const reducer =  require('./social');
const eventMapper = require('./eventMapper');
const linkedEvent = require('../sampleEvents/LINKED.json');

describe('social', () => {

  describe('event LINKED', () => {
    it('should link then unlink', () => {
      const state = reducer(undefined, eventMapper(linkedEvent));
      expect(state.twitter).to.be.deep.equal({});
      expect(state.facebook).to.have.property('10157105901095587');
    });
  });

});
