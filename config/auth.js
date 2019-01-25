/*
This file holds the auth function for jwt
*/
var jwt = require('express-jwt');
module.exports = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});