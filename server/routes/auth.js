let jwt = require('express-jwt');
let secret = require('../config').secret;

/**
 * Grab JWT from header
 * @param {Object} req - request object
 * @return {null}
 */
function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

let auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
