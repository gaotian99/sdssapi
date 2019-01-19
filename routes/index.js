var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profileController');
var ctrlAuth = require('../controllers/authenticationController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
 //router.post('/register', ctrlAuth.register);
 router.post('/login', ctrlAuth.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
