'use strict';

const _ = require('lodash');
const {handleAction, combineActions} = require('redux-actions');
const events = require('./events');

function updateVersion(state, action) {
  return action.version;
}

module.exports = handleAction(combineActions(...events.all), {
  next: updateVersion,
  throw: state => Object.assign({}, state)
}, 0);
