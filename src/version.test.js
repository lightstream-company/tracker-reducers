const {expect} = require('chai');
const reducer = require('./version');

const betaSubscribed = require('../sampleEvents/BETA_SUBSCRIBED.json');
const betaSignedUp = require('../sampleEvents/BETA_SIGNED_UP.json');

describe('version', () => {

  function mapEvent(event, version) {
    return {version, type: event.payload.type};
  }

  it('should initialize version on beta subscribed with event version', () => {
    const state = reducer(undefined, mapEvent(betaSubscribed, 1));
    expect(state).to.equal(1);
  });

  it('should update version based on event version', () => {
    const state = reducer(1, mapEvent(betaSignedUp, 2));
    expect(state).to.equal(2);
  });

  it('should update version on unreferenced event', () => {
    const unknownEvent = {
      type: 'UNKNOWN',
      version: 2
    };
    const state = reducer(1, unknownEvent);
    expect(state).to.equal(1);
  });
});
