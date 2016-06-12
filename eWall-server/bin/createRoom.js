var mongoose = require('mongoose');


var config = require('../config/main');

var Room = require('../models/room');
var User = require('../models/user');

mongoose.connect(config.database);


function addRoomToUser(room, userMail) {
  User.findOne({
    email: userMail
   }, function(err, user) {
    if (err) throw err;

    if (!user) {
      console.log('User not found')
    } else {
      user.accessibleRooms.push(room.id)
      user.save(function(err) {
        if (err) { console.log('error save user')} else { console.log('save user ok')}
      });
       }
  })
}

var newRoom = new Room({
  name: 'Obeya project 1'
});

newRoom.save(function(err) {
  if (err) {
    console.log('Error creating room')
  }
  console.log('create room ok')

addRoomToUser(newRoom, 'gege@gege.org')



  });
