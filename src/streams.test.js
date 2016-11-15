const {expect} = require('chai');
const reducer = require('./streams');
const createdEvent = require('../sampleEvents/CREATED.json');
const editedEvent = require('../sampleEvents/STREAM_EDITED.json');
const addKeywordEvent = require('../sampleEvents/KEYWORD_ADDED.json');
const eventMapper = require('./eventMapper');

describe('streams', () => {

  describe('event CREATED', () => {
    it('should add new stream in state', () => {
      expect(reducer(undefined, eventMapper(createdEvent))).to.have.property('c3111a12');
    });
  });

  describe('event STREAM_EDITED', () => {
    it('should edit an existing stream', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(editedEvent));
      expect(state1.c3111a12).to.have.property('name', 'My New Event');
      expect(state2.c3111a12).to.have.property('name', 'New Name');
    });
  });

  describe('event KEYWORD_ADDED', () => {
    it('should edit an existing stream', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(addKeywordEvent));
      const state3 = reducer(state2, Object.assign({}, eventMapper(addKeywordEvent), {
        payload: {
          network: 'instagram',
          keyword: 'hello'
        }
      }));
      expect(state2.c3111a12.keywords.instagram).to.be.deep.equal(['Arnaud']);
      expect(state3.c3111a12.keywords.instagram).to.be.deep.equal(['Arnaud', 'hello']);
    });
  });

});
