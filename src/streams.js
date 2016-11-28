const {handleActions, combineActions} = require('redux-actions');
const _ = require('lodash');
const events = require('./events');
const {State, defaultStreamValue} = require('./streams.struct');


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
              '$set': _.uniq([...state[id].socialItems.facebook, itemId])
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
  }),
  [events.stream.BOUNDING_BOXES_SET]: (state, action) => {
    const {id, payload} = action;
    const {boundingBoxes, network} = payload;
    return State.update(state, {
      [id]: {
        boundingBoxes: {
          [network]: {
            '$set': boundingBoxes
          }
        }
      }
    });
  },
  [events.stream.BOUNDING_BOXES_CLEARED]: (state, action) => {
    const {id, payload} = action;
    const {network} = payload;
    return State.update(state, {
      [id]: {
        boundingBoxes: {
          [network]: {
            '$set': []
          }
        }
      }
    });
  },
  [combineActions(...events.streamActions)]: (state, action) => {
    return State.update(state, {
      [action.id]: {
        lastAction: {
          '$set': _.pick(action, 'type', 'date')
        }
      }
    });
  }
}, InitialState);
