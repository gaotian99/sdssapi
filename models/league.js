// league.js
var mongoose = require('mongoose'); 

var LeagueSchema = new mongoose.Schema({  
  description: {type: String},
  sport: {type: String},
  leagueManager: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  startDate: {type: Date},
  gender: {type: String},
  competitionLevel: {type: String}
});



mongoose.model('league', LeagueSchema);

module.exports = mongoose.model('league');