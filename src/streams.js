const {handleActions} = require('redux-actions');
const t = require('tcomb');
const events = require('./events');

const socialNetworks = t.enums.of([
  'twitter', 'facebook', 'instagram'
], 'socialNetworks');

const socialItem = t.struct({
  userId: t.maybe(t.String),
  secretToken: t.maybe(t.String),
  name: t.String,
  itemId: t.String,
  accountId: t.String,
  network: socialNetworks,
  streams: t.maybe(t.list(t.String)),
  type: t.String,
  token: t.String
}, 'socialItem');

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
  facebook: t.list(socialItem),
  twitter: t.list(socialItem),
  instagram: t.list(socialItem)
});

const defaultSocialItemsValue = {
  facebook: [],
  twitter: [],
  instagram: []
};

const stream = t.struct({
  name: t.String,
  id: t.String,
  enabled: t.Bool,
  keywords,
  socialItems,
  boundingBoxes: boundingBoxesByNetwork
}, 'stream');

const defaultStreamValue = {
  enabled: true,
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
  }
}, InitialState);
