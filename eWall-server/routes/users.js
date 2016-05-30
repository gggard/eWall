var express = require('express');
var router = express.Router();

var passport = require('passport');


var userToJson = require('../api/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {

  userToJson(req.user, function(userJson) {
    res.json(userJson);
  });

});


module.exports = router;
