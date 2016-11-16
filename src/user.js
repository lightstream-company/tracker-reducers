const {handleActions} = require('redux-actions');
const t = require('tcomb');
const {user, account} = require('./events');

const User = t.struct({
  email: t.String,
  postsRemaining: t.maybe(t.Number),
  id: t.String,
  companyName: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastConnectionDate: t.maybe(t.String),
  lastName: t.maybe(t.String),
  password: t.maybe(t.String)
}, 'User');

const userDefaultValue = {
  postsRemaining: 0
};

/*
 TODO: find a way to define `profile` field of the state with t.union
 insteead of having most of the field in User with t.maybe

const UserBetaSignedUp = t.struct({
  email: t.String,
  id: t.String
}, 'UserBetaSignedUp');
*/


const State = t.struct({
  profile: t.maybe(User),
  logged: t.Boolean
});

const InitialState = State({
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
}, InitialState);
