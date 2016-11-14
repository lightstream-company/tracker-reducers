const {expect} = require('chai');
const reducers = require('./');

describe('package index', () => {

  it('should expose streams reducers', () => {
    expect(reducers).to.have.property('streams');
    expect(reducers.streams).to.be.a('function');
  });

});
