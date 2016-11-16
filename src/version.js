'use strict';

const _ = require('lodash');
const {handleActions} = require('redux-actions');
const events = require('./events');

function updateVersion(state, action) {
  return action.version;
}

const reducers =
  _.flatMap(
    Object.keys(events)
      .map(aggregate => _.values(events[aggregate])))
    .reduce((reducer, action) =>
      Object.assign(reducer, {[action]: updateVersion}), {});

module.exports = handleActions(reducers, 0);
