// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  email: 
  {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');