const {handleActions} = require('redux-actions');
const t = require('tcomb');
const _ = require('lodash');
const events = require('./events');

const boundingBox = t.list(t.Number);
const boundingBoxes = t.list(boundingBox);
const boundingBoxesByNetwork = t.struct({
  twitter: boundingBoxes,
  instagram: boundingBoxes
});

const defaultBoundingBoxesByNetwork = {
  twitter: [],
  instagram: []
};

const keywords = t.struct({
  twitter: t.list(t.String),
  instagram: t.list(t.String)
});

const defaultKeywords = {
  twitter: [],
  instagram: []
};

const socialItems = t.struct({
  facebook: t.list(t.String),
  twitter: t.maybe(t.String),
  instagram: t.maybe(t.String)
});

const defaultSocialItemsValue = {
  facebook: [],
  twitter: null,
  instagram: null
};

const stream = t.struct({
  name: t.String,
  id: t.String,
  enabled: t.Bool,
  activated: t.Bool,
  keywords,
  socialItems,
  boundingBoxes: boundingBoxesByNetwork
}, 'stream');

const defaultStreamValue = {
  enabled: true,
  activated: true,
  keywords: defaultKeywords,
  socialItems: defaultSocialItemsValue,
  boundingBoxes: defaultBoundingBoxesByNetwork
};

const State = t.dict(t.String, stream);

const InitialState = new State({});

module.exports = handleActions({
  [events.stream.CREATED]: (state, action) => {
    const {payload, id} = action;
    return State.update(state, {
      [id]: {
        '$set': Object.assign({}, defaultStreamValue, payload, {
          id
        })
      }
    });
  },
  [events.stream.STREAM_EDITED]: (state, action) => {
    const {payload, id} = action;
    return State.update(state, {
      [id]: {
        '$merge': payload
      }
    });
  },
  [events.stream.KEYWORD_ADDED]: (state, action) => {
    const {payload, id} = action;
    const {network, keyword} = payload;
    return State.update(state, {
      [id]: {
        keywords: {
          [network]: {
            '$push': [keyword.toLowerCase()]
          }
        }
      }
    });
  },
  [events.stream.KEYWORD_REMOVED]: (state, action) => {
    const {payload, id} = action;
    const {network, keyword} = payload;
    const orginalKeywords = state[id].keywords[network];
    return State.update(state, {
      [id]: {
        keywords: {
          [network]: {
            '$set': _.without(orginalKeywords, keyword.toLowerCase())
          }
        }
      }
    });
  },
  [events.stream.ENABLED]: (state, action) => {
    const {id} = action;
    return State.update(state, {
      [id]: {
        enabled: {
          '$set': true
        }
      }
    });
  },
  [events.stream.DISABLED]: (state, action) => {
    const {id} = action;
    return State.update(state, {
      [id]: {
        enabled: {
          '$set': false
        }
      }
    });
  },
  [events.stream.SOCIAL_ITEM_LINKED]: (state, action) => {
    const {id, payload} = action;
    const {network, itemId} = payload;
    if (network === 'facebook') {
      return State.update(state, {
        [id]: {
          socialItems: {
            facebook: {
              '$push': itemId
            }
          }
        }
      });
    } else {
      //twitter & instagram
      return State.update(state, {
        [id]: {
          socialItems: {
            [network]: {
              '$set': itemId
            }
          }
        }
      });
    }
  },
  [events.stream.SOCIAL_ITEM_UNLINKED]: (state, action) => {
    const {id, payload} = action;
    const {network, itemId} = payload;
    if (network === 'facebook') {
      return State.update(state, {
        [id]: {
          socialItems: {
            facebook: {
              '$set': _.without(state[id].socialItems.facebook, itemId)
            }
          }
        }
      });
    } else {
      //twitter & instagram
      return State.update(state, {
        [id]: {
          socialItems: {
            [network]: {
              '$set': null
            }
          }
        }
      });
    }
  },
  [events.stream.ACTIVATED]: (state, action) => State.update(state, {
    [action.id]: {
      activated: {
        '$set': true
      }
    }
  }),
  [events.stream.DEACTIVATED]: (state, action) => State.update(state, {
    [action.id]: {
      activated: {
        '$set': false
      }
    }
  })
}, InitialState);
