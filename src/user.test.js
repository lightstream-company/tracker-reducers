const {expect} = require('chai');
const reducer = require('./user');
const eventMapper = require('./eventMapper');

const betaSubscribed = require('../sampleEvents/BETA_SUBSCRIBED.json');
const betaSignedUp = require('../sampleEvents/BETA_SIGNED_UP.json');
const signedIn = require('../sampleEvents/SIGNED_IN.json');
const creditedEvent = require('../sampleEvents/CREDITED.json');
const debitedEvent = require('../sampleEvents/DEBITED.json');

describe('user', () => {

  function initUser(){
    const state = reducer(undefined, eventMapper(betaSubscribed));
    return reducer(state, eventMapper(betaSignedUp));
  }

  describe('event BETA_SUBSCRIBED', () => {
    it('should subscribe', () => {
      const state = reducer(undefined, eventMapper(betaSubscribed));
      expect(state.profile).to.have.property('id', '5baf7ab6');
      expect(state.profile).to.have.property('email', 'jerome.avoustin@tweetping.net');
    });
  });

  describe('event BETA_SIGNED_UP', () => {
    it('should signed up', () => {
      expect(initUser().profile).to.be.deep.equal({
        id: '5baf7ab6',
        email: 'jerome.avoustin@tweetping.net',
        companyName: 'Lightstream',
        firstName: 'Jerome',
        lastName: 'Avoustin',
        password: 'ca88f32148e3054974dc77948346109b15d24c85a3e41b02b215942c7edaae97',
        postsRemaining: 0,
        lastConnectionDate: undefined
      });
    });
  });

  describe('event SIGNED_IN', () => {
    it('should signed up', () => {
      const state1 = reducer(undefined, eventMapper(betaSubscribed));
      const state2 = reducer(state1, eventMapper(betaSignedUp));
      expect(state1.logged).to.be.equal(false);
      expect(state2.logged).to.be.equal(false);
    });
  });

  describe('event SIGNED_IN', () => {
    it('should signed up', () => {
      const state1 = reducer(undefined, eventMapper(betaSubscribed));
      const state2 = reducer(state1, eventMapper(betaSignedUp));
      const state3 = reducer(state2, eventMapper(signedIn));
      expect(state1.logged).to.be.equal(false);
      expect(state3.logged).to.be.equal(true);
      expect(state3.profile.lastConnectionDate).to.be.equal('2016-09-19T23:28:44.568Z');
    });
  });

  describe('event CREDITED / DEBITED', () => {
    it('should credit with 10K then remove 1K', () => {
      const state2 = initUser();
      const state3 = reducer(state2, eventMapper(creditedEvent));
      const state4 = reducer(state3, eventMapper(creditedEvent));
      const state5 = reducer(state4, eventMapper(debitedEvent));
      expect(state2.profile.postsRemaining).to.be.equal(0);
      expect(state3.profile.postsRemaining).to.be.equal(10000);
      expect(state4.profile.postsRemaining).to.be.equal(20000);
      expect(state5.profile.postsRemaining).to.be.equal(19000);
    });
  });

});
