var express = require('express');
var router = express.Router();


var League = require('../models/league');
var Team = require('../models/team');
//var Player = require('./player');


//Creates a new league **WORKS
router.post('/create', function (req, res) {
    League.create(
        {
            description: req.body.description,
            sport: req.body.sport,
            startDate: req.body.startDate,
            gender: req.body.gender,
            competitionLevel: req.body.competitionLevel,
            leagueManager: req.body.leagueManager,
        },
        function (err, league) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(league);
        });
});

//adds a leagueID to a teamID **WORKS
router.post('/addteam', function (req, res) {

    let teamID = req.body.teamID;

    Team.findByIdAndUpdate(
        teamID,
        {
            leagueID: req.body.leagueID
        },
        {
            new: true
        },
        function (err, team) {
            if (err) return res.status(500).send("There was a problem updating the team.");
            res.status(200).send("This was successful");
        }
    );
});

//Returns all the leagues in the database
router.get('/', function (req, res) {
    League.find({} , function (err, leagues) {
        if (err) return res.status(500).send("There was a problem finding the leagues.");
        res.status(200).send(leagues);
    });
});


//Returns all the unique sports in the database
router.get('/sport', function (req, res) {
    League.distinct("sport", {}, function (err, league) {
        if (err) return res.status(500).send("There was a problem finding the leagues.");
        res.status(200).send(league);
    });
});


//Deletes a single league from the database
router.delete('/:id', function (req, res) {
    League.findByIdAndRemove(req.params.id, function (err, league) {
        if (err) return res.status(500).send("There was a problem deleting the league.");
        res.status(200).send("League " + league.description + " was deleted.");
    });
});

//Updates a single team in the database
router.put('/:id', function (req, res) {
    League.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, team) {
        if (err) return res.status(500).send("There was a problem updating the team.");
        res.status(200).send(team);
    });
});





//Gets all leagues based on the sport ** WORKS
router.get('/:sport', function (req, res) {
    let sport = req.params.sport;
    League.find({
        sport: sport
    }, function (err, league) {
        if (err) return res.status(500).send("There was a problem finding the leagues.");

        res.status(200).send(league);
    });
});

//Gets a single league from the database
router.get('/league/:id', function(req, res)
{
    console.log(req.params.id);
    let leagueID = req.params.id;
    League.findById(leagueID, function(err, league) 
    {
        if (err) return res.status(500).send("There was a problem finding the league.");
        if(!league) return res.status(404).send("No league found.");
        res.status(200).send(league);
    });
});

//Gets all teams with a specific leagueID**WORKS

router.get('/team/:id', function (req, res) {
    let leagueID = req.params.id;

    //find teams
    Team.find(
        {
            leagueID: leagueID
        },
        function (err, team) {
            console.log(team);
            if (err || !team) {

                res.send("Error!");

            }
            res.status(200).send(team);
        })
});






module.exports = router;