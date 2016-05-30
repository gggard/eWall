var User = require('../models/user');
var Room = require('../models/room');

function userToJson(user, cb) {
  User.findOne({_id : user.id})
   .populate('accessibleRooms')
   .exec(function (err, user) {
       if (err) console.log(err);
       cb({name : user.name,
           accessibleRooms : user.accessibleRooms});
});
}

module.exports = userToJson
