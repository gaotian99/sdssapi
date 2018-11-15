var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded( {extended: true}));
router.use(bodyParser.json());

var Player = require('./player');


//Creates a new player
router.post('/', function (req, res) 
{
    Player.create(
    {
        player_name : req.body.player_name,
        teamID : req.body.teamID,
    },
    function(err, player)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).send("There was a problem adding the information to the database.");
        } 
        res.status(200).send(player);
    });
});

//Returns all the players in the database
router.get('/', function (req, res)
{
    Player.find({}, function (err, players)
    {
        if(err) return res.status(500).send("There was a problem finding the players.");
        res.status(200).send(players);
    });
});

//Gets a single user from the database
router.get('/:id', function(req, res)
{
    Player.findById(req.params.id, function(err, player) 
    {
        if (err) return res.status(500).send("There was a problem finding the player.");
        if(!user) return res.status(404).send("No user found.");
        res.status(200).send(player);
    });
});

//Deletes a single user from the database
router.delete('/:id', function (req, res) 
{
    Player.findByIdAndRemove(req.params.id, function(err,player) 
    {
        if(err) return res.status(500).send("There was a problem deleting the player.");
        res.status(200).send("Player "+ player.name + " was deleted.");
    });
});

//Updates a single user in the database
router.put('/:id', function (req, res) 
{
    PLayers.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, player)
    {
        if(err) return res.status(500).send("There was a problem updating the player.");
        res.status(200).send(players);
    });
});



module.exports = router;