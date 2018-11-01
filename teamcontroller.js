var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded( {extended: true}));
router.use(bodyParser.json());

var RegisteredTeam = require('./team');


//Creates a new user
router.post('/', function (req, res) 
{
    RegisteredTeam.create(
    {
        team_name : req.body.team_name,
        team_sport : req.body.team_sport,
    },
    function(err, user)
    {
        if(err)
        {
            return res.status(500).send("There was a problem adding the information to the database.");
        } 
        res.status(200).send(user);
    });
});

//Returns all the users in the database
router.get('/', function (req, res)
{
    RegisteredTeam.find({}, function (err, users)
    {
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

//Gets a single user from the database
router.get('/:id', function(req, res)
{
    RegisteredTeam.findById(req.params.id, function(err, user) 
    {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if(!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

//Deletes a single user from the database
router.delete('/:id', function (req, res) 
{
    RegisteredTeam.findByIdAndRemove(req.params.id, function(err,user) 
    {
        if(err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name + " was deleted.");
    });
});

//Updates a single user in the database
router.put('/:id', function (req, res) 
{
    RegisteredTeam.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user)
    {
        if(err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});



module.exports = router;