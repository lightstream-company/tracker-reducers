const t = require('tcomb');

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

module.exports = {
  State,
  defaultStreamValue
};
