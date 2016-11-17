const {handleActions} = require('redux-actions');
const t = require('tcomb');
const Network = require('./network');
const {social} = require('./events');

const FacebookPage = t.struct({
  userId: t.maybe(t.String),
  secretToken: t.maybe(t.String),
  name: t.String,
  itemId: t.String,
  accountId: t.String,
  streams: t.list(t.String),
  type: t.String,
  token: t.String
}, 'SocialItem');


const SocialAccount = t.struct({
  id: t.String,
  network: Network,
  userId: t.String,
  accountId: t.String,
  screenName: t.String,
  valid: t.Boolean,
  stream: t.maybe(t.String)
}, 'SocialAccount');

const socialAccountDefaultValues = {
  valid: true
};

const SocialAccounts = t.dict(t.String, SocialAccount);
const FacebookPages = t.dict(t.String, FacebookPage);

const State = t.struct({
  twitter: SocialAccounts,
  facebook: SocialAccounts,
  instagram: SocialAccounts,
  facebookPages: FacebookPages
});

const initialState = State({
  twitter: {},
  facebook: {},
  instagram: {},
  facebookPages: {}
});

module.exports = handleActions({
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
  }
}, initialState);
