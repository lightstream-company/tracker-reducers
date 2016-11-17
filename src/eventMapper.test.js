const {expect} = require('chai');
const createdEvent = require('../sampleEvents/CREATED.json');
const eventMapper = require('./eventMapper');

describe('eventMapper', () => {
  it('should reformat an event', () => {
    expect(eventMapper(createdEvent)).to.be.deep.equal({
      type: 'STREAM_CREATED',
      id: 'c3111a12',
      payload: {
        name: 'My New Event',
        activated: true,
        userId: '8d86c10d'
      }
    });
  });
});
