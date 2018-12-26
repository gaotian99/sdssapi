var express = require('express');
var router = express.Router();


var Match = require('../models/match');


//Creates a new match
router.post('/create', function (req, res) 
{
    Match.create(
    {
        location : req.body.location,
        startDate: req.body.startDate,
    },
    function(err, match)
    {
        if(err)
        {
            return res.status(500).send("There was a problem adding the information to the database.");
        } 
        res.status(200).send(match);
    });
});

//Returns all the matches in the database
router.get('/', function (req, res)
{
    Match.find({}, function (err, matches)
    {
        if(err) return res.status(500).send("There was a problem finding the matches.");
        res.status(200).send(matches);
    });
});

//Gets a single match from the database
router.get('/:id', function(req, res)
{
    Match.findById(req.params.id, function(err, match) 
    {
        if (err) return res.status(500).send("There was a problem finding the match.");
        if(!match) return res.status(404).send("No match found.");
        res.status(200).send(match);
    });
});

//Deletes a single match from the database
router.delete('/:id', function (req, res) 
{
    Match.findByIdAndRemove(req.params.id, function(err,match) 
    {
        if(err) return res.status(500).send("There was a problem deleting the match.");
        res.status(200).send("Match "+ match.id + " was deleted.");
    });
});

//Updates a single match in the database
router.put('/:id', function (req, res) 
{
    Match.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, match)
    {
        if(err) return res.status(500).send("There was a problem updating the match.");
        res.status(200).send(match);
    });
});



module.exports = router;











//this i dont need

// //Creates a new player and returns the team the player was created for. Includes all players already assigned to the team.
// router.post('/', function (req, res) {
//     Player.create(
//         {
//             player_name: req.body.player_name,
//         },
//         function (err, player) {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send("There was a problem adding the information to the database.");
//             }
//                 console.log(req.body.teamID);
//                 console.log("hello");
//                 //console.log(teamID);
//                 //res.status(200).send(player);//return the player
//                 let teamID = req.body.teamID;

//                 //find team????

//                 Team.findByIdAndUpdate(teamID, { $push: { players: player._id } }, { new: true }, function (err, team) {
//                     if (err) return res.status(500).send("There was a problem updating the user.");
//                     res.status(200).send(team);
//                 });
            
//         });

//     //res.status(200).send(player);//return the player
// });