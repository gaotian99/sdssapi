var express = require('express');
var router = express.Router();

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


router.post('/register', function (req, res) {

    if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.age = req.body.age;
  user.sex = req.body.sex;
  user.phoneNumber = req.body.phoneNumber;
  user.role = req.body.role;


  //SAVE TO MONGO AND RETURN TOKEN
  user.save(function (err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
});

router.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log("found user");
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res, next);

})


























router.login = function (req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports = router;