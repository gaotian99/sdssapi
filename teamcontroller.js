var express = require('express');
var router = express.Router();


var RegisteredTeam = require('./team');
var Player = require('./player');


//Creates a new team
router.post('/', function (req, res) {
    RegisteredTeam.create(
        {
            team_name: req.body.team_name,
            team_sport: req.body.team_sport,
            team_captain: req.body.team_captain,
        },
        function (err, team) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(team);
        });
});

//Returns all the teams in the database
router.get('/', function (req, res) {
    RegisteredTeam.find({}, function (err, teams) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(teams);
    });
});

//Gets a single team from the database
// router.get('/:id', function(req, res)
// {
//     RegisteredTeam.findById(req.params.id, function(err, team) 
//     {
//         if (err) return res.status(500).send("There was a problem finding the team.");
//         if(!team) return res.status(404).send("No team found.");
//         res.status(200).send(team);
//     });
// });

//Gets a single team name and ID from the database DOM FUNCTION

router.get('/:id', function (req, res) {
    let teamID = req.params.id;
    let returnData = {};


    //find team
    RegisteredTeam.findById(

        {
            _id: teamID
        }, function (err, team) {
            if (err || !team) {
                res.send("Error!");
                return;
            }
            Player.find(
                {
                    _id:{$in:team.players}
                }, function (err, players) {
                    if (err) {
                        res.send("MAJOR ERROR");
                    }
                    team = team.toJSON();
                    //players = players.toJSON();
                    returnData.team = team;
                    returnData.team.players = players;

                    res.json(returnData);
                })
        })
});

//Deletes a single team from the database
router.delete('/:id', function (req, res) {
    RegisteredTeam.findByIdAndRemove(req.params.id, function (err, team) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User " + team.name + " was deleted.");
    });
});

//Updates a single team in the database
router.put('/:id', function (req, res) {
    RegisteredTeam.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, team) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(team);
    });
});



module.exports = router;