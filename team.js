// team.js
var mongoose = require('mongoose');  

var RegisteredTeamSchema = new mongoose.Schema({
    team_name:
    {
      type: String,
      unique: true,
      required: true
    },
    team_sport:
    {
      type: String,
      required: true,
    },
    team_captain:
    {
      type: String,
      required: true
    }
  })


mongoose.model('RegisteredTeam', RegisteredTeamSchema)

module.exports = mongoose.model('RegisteredTeam');