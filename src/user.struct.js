'use strict';

const t = require('tcomb');
const Action = require('./actions');

const User = t.struct({
  email: t.String,
  postsRemaining: t.maybe(t.Number),
  id: t.String,
  companyName: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastConnectionDate: t.maybe(t.String),
  lastName: t.maybe(t.String)
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
  lastAction: t.maybe(Action),
  logged: t.Boolean
});

module.exports = {
  State,
  userDefaultValue
};
