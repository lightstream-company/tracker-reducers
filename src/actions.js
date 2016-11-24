'use strict';

const t = require('tcomb');

module.exports = t.struct({
  type: t.String,
  date: t.String
}, 'Action');