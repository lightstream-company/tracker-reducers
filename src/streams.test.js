const {expect} = require('chai');
const reducer = require('./streams');
const eventMapper = require('./eventMapper');
const createdEvent = require('../sampleEvents/CREATED.json');
const editedEvent = require('../sampleEvents/STREAM_EDITED.json');
const addKeywordEvent = require('../sampleEvents/KEYWORD_ADDED.json');
const removeKeywordEvent = require('../sampleEvents/KEYWORD_REMOVED.json');
const enabledEvent = require('../sampleEvents/ENABLED.json');
const disabledEvent = require('../sampleEvents/DISABLED.json');
const linkEvent = require('../sampleEvents/SOCIAL_ITEM_LINKED.json');
const unlinkEvent = require('../sampleEvents/SOCIAL_ITEM_UNLINKED.json');
const activatedEvent = require('../sampleEvents/ACTIVATED.json');
const deactivatedEvent = require('../sampleEvents/DEACTIVATED.json');
const bboxSetEvent = require('../sampleEvents/BOUNDING_BOXES_SET.json');
const bboxClearEvent = require('../sampleEvents/BOUNDING_BOXES_CLEARED.json');

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
    it('should add two keywords', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(addKeywordEvent));
      const state3 = reducer(state2, Object.assign({}, eventMapper(addKeywordEvent), {
        payload: {
          network: 'instagram',
          keyword: 'hello'
        }
      }));
      expect(state2.c3111a12.keywords.instagram).to.be.deep.equal(['arnaud']);
      expect(state3.c3111a12.keywords.instagram).to.be.deep.equal(['arnaud', 'hello']);
    });
  });

  describe('event KEYWORD_REMOVED', () => {
    it('should add one keyword the remove it', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(addKeywordEvent));
      const state3 = reducer(state2, eventMapper(removeKeywordEvent));
      expect(state2.c3111a12.keywords.instagram).to.be.deep.equal(['arnaud']);
      expect(state3.c3111a12.keywords.instagram).to.be.deep.equal([]);
    });
  });

  describe('event ENABLED / DISABLED', () => {
    it('should disabled then enabled again', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(disabledEvent));
      const state3 = reducer(state2, eventMapper(enabledEvent));
      expect(state1.c3111a12.enabled).to.be.equal(true);
      expect(state2.c3111a12.enabled).to.be.equal(false);
      expect(state3.c3111a12.enabled).to.be.equal(true);
    });
  });

  describe('event SOCIAL_ITEM_LINKED / SOCIAL_ITEM_UNLINKED', () => {
    it('should link / unlink a social item to a stream', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(linkEvent));
      const state3 = reducer(state2, eventMapper(unlinkEvent));
      expect(state1.c3111a12.socialItems.twitter).to.be.equal(null);
      expect(state2.c3111a12.socialItems.twitter).to.be.equal('59106894');
      expect(state3.c3111a12.socialItems.twitter).to.be.equal(null);
    });
  });

  describe('event ACTIVATE / DEACTIVATE', () => {
    it('should activate / deactiavte a stream', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(deactivatedEvent));
      const state3 = reducer(state2, eventMapper(activatedEvent));
      expect(state1.c3111a12.activated).to.be.equal(true);
      expect(state2.c3111a12.activated).to.be.equal(false);
      expect(state3.c3111a12.activated).to.be.equal(true);
    });
  });

  describe('event BOUNDING_BOXES_SET / BOUNDING_BOXES_CLEARED', () => {
    it('should add then clear bouding box', () => {
      const state1 = reducer(undefined, eventMapper(createdEvent));
      const state2 = reducer(state1, eventMapper(bboxSetEvent));
      const state3 = reducer(state2, eventMapper(bboxClearEvent));
      expect(state1.c3111a12.boundingBoxes.twitter).to.be.deep.equal([]);
      expect(state2.c3111a12.boundingBoxes.twitter).to.be.deep.equal([[-10,-10,10,10]]);
      expect(state3.c3111a12.boundingBoxes.twitter).to.be.deep.equal([]);
    });
  });

});
