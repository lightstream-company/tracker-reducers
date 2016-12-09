const {expect} = require('chai');
const {createStore, combineReducers} = require('redux');
const events = require('./events');
const reducers = require('../');
const newState = require('./fakeInitialState');

describe('store', () => {

  it('should init a empty store', () => {
    const store = createStore(combineReducers(reducers));
    expect(store.dispatch).to.be.a('function');
    expect(store.getState()).to.have.property('streams');
    expect(store.getState()).to.have.property('user');
    expect(store.getState()).to.have.property('social');
    expect(store.getState()).to.have.property('version');
  });

  it('should reset store after creation', () => {
    const store = createStore(combineReducers(reducers));
    store.dispatch({
      type: events.global.RESET,
      payload: newState
    });
    const state = store.getState();
    expect(state.streams).to.have.property('2593ede3');
    expect(state.streams).to.have.property('7c9470ea');
    expect(state.user.profile.email).to.be.equal('franck.ernewein@gmail.com');
    expect(state.social.twitter).to.have.property('59106894');
    expect(state.version).to.be.equal(2289);
  });

});


