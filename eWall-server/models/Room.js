var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
   content: { type: String },
   type: { type: String },
   pos:{
     x : { type: Number},
     y : { type: Number}
   }
});

var RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  notes: [noteSchema]
});

module.exports = mongoose.model('Room', RoomSchema);
