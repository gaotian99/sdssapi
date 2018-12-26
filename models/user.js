// User.js
var mongoose = require('mongoose'); 

var UserSchema = new mongoose.Schema({  
  email: {type: String, unique: false, required: true },
  password:{hash: String,salt: String},
  name: {type: String,required: true},
  age:{type: Number, required: true,},
  sex:{type: String,required: true,},
  phoneNumber:{type: String,required: true,},
  role:{type: String, required: true,},
});



mongoose.model('user', UserSchema);

module.exports = mongoose.model('user');