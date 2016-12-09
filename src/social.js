const {handleActions} = require('redux-actions');
const {social} = require('./events');
const {State, socialAccountDefaultValues} = require('./social.struct');


const initialState = State({
  twitter: {},
  facebook: {},
  instagram: {},
  facebookPages: {}
});

module.exports = handleActions({
  RESET: (state, action) => new State(action.payload.social),
  [social.LINKED]: (state, action) => {
    const {payload, id} = action;
    const {type, accountId} = payload;
    return State.update(state, {
      [type]: {
        [accountId]: {
          '$set': Object.assign({
            network: type,
            id
          }, payload, socialAccountDefaultValues)
        }
      }
    });
  },
  [social.EXPIRED]: (state, action) => {
    const {type, accountId} = action.payload;
    return State.update(state, {
      [type]: {
        [accountId]: {
          valid: {
            '$set': false
          }
        }
      }
    });
  }
}, initialState);
