'use strict';

const {handleAction, combineActions} = require('redux-actions');
const events = require('./events');

function updateVersion(state, action) {
  return (action.type === 'RESET' ? action.payload : action).version;
}

module.exports = handleAction(combineActions(...events.all), {
  next: updateVersion,
  throw: state => Object.assign({}, state)
}, 0);
