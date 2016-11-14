const {expect} = require('chai');
const reducer = require('./streams');
const createdEvent = require('../sampleEvents/CREATED.json');
const eventMapper = require('./eventMapper');

describe('streams', () => {

  describe('event CREATED', () => {
    it('should add new stream in state', () => {
      expect(reducer(undefined, eventMapper(createdEvent))).to.have.property('c3111a12');
    });
  });

});
