// league.js
var mongoose = require('mongoose'); 

var MatchResultSchema = new mongoose.Schema({  
  teamID: {type: mongoose.Schema.Types.ObjectId, ref: "team"},
  matchID: {type: mongoose.Schema.Types.ObjectId, ref: "match"},
  result: {type: Boolean},
});



mongoose.model('matchResult', MatchResultSchema);

module.exports = mongoose.model('matchResult');