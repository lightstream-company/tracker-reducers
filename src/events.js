'use strict';

const {flatMap, values} = require('lodash');

const events = {
  global: {
    RESET: 'RESET'
  },
  account: {
    CREDITED: 'ACCOUNT_CREDITED',
    DEBITED: 'ACCOUNT_DEBITED',
    REFILLED: 'ACCOUNT_REFILLED',
    DEPLETED: 'ACCOUNT_DEPLETED'
  },
  user: {
    BETA_SUBSCRIBED: 'BETA_SUBSCRIBED',
    BETA_SIGNED_UP: 'USER_BETA_SIGNED_UP',
    SIGNED_IN: 'USER_SIGNED_IN',
    PASSWORD_RECOVERY_ASKED: 'USER_PASSWORD_RECOVERY_ASKED',
    PASSWORD_CHANGED: 'USER_PASSWORD_CHANGED',
    TOKEN_REVOKED: 'USER_TOKEN_REVOKED'
  },
  stream: {
    CREATED: 'STREAM_CREATED',
    SOCIAL_ITEM_LINKED: 'SOCIAL_ITEM_LINKED_TO_STREAM',
    SOCIAL_ITEM_UNLINKED: 'SOCIAL_ITEM_UNLINKED_FROM_STREAM',
    KEYWORD_ADDED: 'KEYWORD_ADDED_TO_STREAM',
    KEYWORD_REMOVED: 'KEYWORD_REMOVED_FROM_STREAM',
    DISABLED: 'STREAM_DISABLED',
    ENABLED: 'STREAM_ENABLED',
    STREAM_EDITED: 'STREAM_EDITED',
    BOUNDING_BOXES_SET: 'BOUNDING_BOXES_SET_TO_STREAM',
    BOUNDING_BOXES_CLEARED: 'BOUNDING_BOXES_CLEARED_FROM_STREAM',
    ACTIVATED: 'STREAM_ACTIVATED',
    DEACTIVATED: 'STREAM_DEACTIVATED',
    CONNECTOR_ENABLED: 'STREAM_NETWORK_CONNECTOR_ENABLED',
    CONNECTOR_DISABLED: 'STREAM_NETWORK_CONNECTOR_DISABLED',
    CONNECTOR_RESET: 'STREAM_NETWORK_CONNECTOR_RESET'
  },
  social: {
    LINKED: 'SOCIAL_ACCOUNT_LINKED',
    UNLINKED: 'SOCIAL_ACCOUNT_UNLINKED',
    EXPIRED: 'SOCIAL_ACCOUNT_EXPIRED'
  }
};

const all = flatMap(
  Object.keys(events)
    .map(aggregate => values(events[aggregate])));

const streamAutoEvents = [
  events.stream.ACTIVATED,
  events.stream.DEACTIVATED,
  events.stream.CONNECTOR_ENABLED,
  events.stream.CONNECTOR_DISABLED,
  events.stream.CONNECTOR_RESET
];

const streamActions = values(events.stream)
  .filter(e => streamAutoEvents.indexOf(e) < 0);

const actions = [events.account.CREDITED, events.account.REFILLED]
  .concat(values(events.user).filter(e => e !== events.user.TOKEN_REVOKED))
  .concat(streamActions)
  .concat(values(events.social));

module.exports = Object.assign({}, events, {
  all,
  actions,
  streamActions
});
