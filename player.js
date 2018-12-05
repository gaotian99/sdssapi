// player.js
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({


    player_name:
    {
      type: String,
      unique: false,
      required: true
    },

  })


mongoose.model('PlayerSchema', PlayerSchema)

module.exports = mongoose.model('PlayerSchema');