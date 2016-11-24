const {handleActions} = require('redux-actions');
const {user, account} = require('./events');
const {State, userDefaultValue} = require('./user.struct');


const initialState = State({
  profile: null,
  logged: false
});

module.exports = handleActions({
  [user.BETA_SUBSCRIBED]: (state, action) => {
    return State.update(state, {
      profile: {
        '$set': {
          email: action.payload.email,
          id: action.id
        }
      }
    });
  },
  [user.BETA_SIGNED_UP]: (state, action) => {
    const {payload} = action;
    return State.update(state, {
      profile: {
        '$merge': Object.assign({}, payload, userDefaultValue)
      }
    });
  },
  [user.SIGNED_IN]: (state, action) => {
    return State.update(state, {
      profile: {
        lastConnectionDate: {
          '$set': action.payload.at
        }
      },
      logged: {
        '$set': true
      }
    });
  },
  [account.CREDITED]: (state, action) => {
    return State.update(state, {
      profile: {
        postsRemaining: {
          '$set': state.profile.postsRemaining + action.payload.amount
        }
      }
    });
  },
  [account.DEBITED]: (state, action) => {
    return State.update(state, {
      profile: {
        postsRemaining: {
          '$set': Math.max(state.profile.postsRemaining - action.payload.amount, 0)
        }
      }
    });
  }
}, initialState);
