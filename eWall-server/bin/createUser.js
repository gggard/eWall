var mongoose = require('mongoose');


var config = require('../config/main');

var Room = require('../models/room');
var User = require('../models/user');

mongoose.connect(config.database);


var newUser = new User({
  email: 'gege@gege.org',
  password: 'gege',
  name: 'gege'
});


newUser.save(function(err) {
  if (err) {
    console.log('Error creating user', err)
  }
  console.log('create user ok')
  });
