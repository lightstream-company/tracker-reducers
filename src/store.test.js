const {expect} = require('chai');
const {createStore, combineReducers} = require('redux');
const reducers = require('../');

describe('store', () => {

  it('should init a empty store', () => {
    const store = createStore(combineReducers(reducers));
    expect(store.dispatch).to.be.a('function');
    expect(store.getState()).to.have.property('streams');
    expect(store.getState()).to.have.property('user');
    expect(store.getState()).to.have.property('social');
    expect(store.getState()).to.have.property('version');
  });

});



