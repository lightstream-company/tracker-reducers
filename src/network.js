const t = require('tcomb');

module.exports = t.enums.of([
  'twitter', 'facebook', 'instagram'
], 'Networks');
