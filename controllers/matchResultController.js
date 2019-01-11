var express = require('express');
var router = express.Router();


var MatchResult = require('../models/matchResult');


//Creates a new matchResult
router.post('/create', function (req, res) {
    MatchResult.create(
        {
            teamID: req.body.teamID,
            matchID: req.body.matchID,
            result: req.body.result,
        },
        function (err, matchResult) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(matchResult);
        });
});

//Returns all the matchResults in the database
router.get('/', function (req, res) {
    MatchResult.find({}, function (err, matchResults) {
        if (err) return res.status(500).send("There was a problem finding the matchResults.");
        res.status(200).send(matchResults);
    });
});

//Returns all the matchResults by team
router.get('/', function (req, res){
    let teamID = req.body.teamID;
    MatchResult.find({
        teamID: teamID
    }, function (err, matchResults) {
        if (err) return res.status(500).send("There was a problem find the teams matchResults.");
        res.status(200).send(matchResults);
    })
})

//returns all the wins by team
router.get('/', function (req, res){
    let teamID = req.body.teamID;
    let wins;
    MatchResult.count({
        teamID: teamID,
        result: true,
    })
})





//Gets a single matchResult from the database
router.get('/:id', function (req, res) {
    MatchResult.findById(req.params.id, function (err, matchResult) {
        if (err) return res.status(500).send("There was a problem finding the matchResult.");
        if (!matchResult) return res.status(404).send("No matchResult found.");
        res.status(200).send(matchResult);
    });
});

//Deletes a single matchResult from the database
router.delete('/:id', function (req, res) {
    MatchResult.findByIdAndRemove(req.params.id, function (err, matchResult) {
        if (err) return res.status(500).send("There was a problem deleting the matchResult.");
        res.status(200).send("MatchResult " + matchResult.id + " was deleted.");
    });
});

//Updates a single matchResult in the database
router.put('/:id', function (req, res) {
    MatchResult.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, matchResult) {
        if (err) return res.status(500).send("There was a problem updating the matchResult.");
        res.status(200).send(matchResult);
    });
});



module.exports = router;