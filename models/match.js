// league.js
var mongoose = require('mongoose'); 

var MatchSchema = new mongoose.Schema({  
  location: {type: String},
  startDate: {type: Date},
});



mongoose.model('match', MatchSchema);

module.exports = mongoose.model('match');