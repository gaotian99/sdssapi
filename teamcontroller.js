var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded( {extended: true}));
router.use(bodyParser.json());

var RegisteredTeam = require('./team');


//Creates a new team
router.post('/', function (req, res) 
{
    RegisteredTeam.create(
    {
        team_name : req.body.team_name,
        team_sport : req.body.team_sport,
        team_captain: req.body.team_captain,
    },
    function(err, team)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).send("There was a problem adding the information to the database.");
        } 
        res.status(200).send(team);
    });
});

//Returns all the teams in the database
router.get('/', function (req, res)
{
    RegisteredTeam.find({}, function (err, teams)
    {
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(teams);
    });
});

//Gets a single user from the database
router.get('/:id', function(req, res)
{
    RegisteredTeam.findById(req.params.id, function(err, team) 
    {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if(!user) return res.status(404).send("No user found.");
        res.status(200).send(team);
    });
});

//Deletes a single user from the database
router.delete('/:id', function (req, res) 
{
    RegisteredTeam.findByIdAndRemove(req.params.id, function(err,team) 
    {
        if(err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ team.name + " was deleted.");
    });
});

//Updates a single user in the database
router.put('/:id', function (req, res) 
{
    RegisteredTeam.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, team)
    {
        if(err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(team);
    });
});



module.exports = router;