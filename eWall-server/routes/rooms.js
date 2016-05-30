var express = require('express');
var router = express.Router();

var passport = require('passport');

var Room = require('../models/room');

function getNote(req, res) {
  var roomId = req.params.roomId;
  var noteId = req.params.noteId;
  Room.findOne({_id : roomId, 'notes._id' : noteId})
    .exec(function (err, room) {
      if ((!room) || (err)) {
         res.status(404).send('Room not found');
         return;
       }

      res.send(room.notes.filter((n) => n._id==noteId)[0])
    });
}

router.get('/:roomId/notes/:noteId', passport.authenticate('jwt', { session: false }), getNote);

router.post('/:roomId/notes/:noteId/position',
           passport.authenticate('jwt', { session: false }),
           function(req, res) {
              var roomId = req.params.roomId;
              var noteId = req.params.noteId;
              var newPos = req.body;
              if (!newPos) res.status(404).send('Bad parameters for POST request');
              //res.redirect(req.baseUrl+'/'+roomId+'/notes/'+noteId);

              Room.findOne({_id : roomId, 'notes._id' : noteId})
                .exec(function (err, room) {
                  if ((!room) || (err)) {
                     res.status(404).send('Room not found');
                     return;
                  }

                  for (var i = 0; i < room.notes.length; i++) {
                    if (room.notes[i]._id == noteId)
                        room.notes[i].pos=newPos.pos.pos;
                  }


                  console.log(newPos.pos.pos);
                  console.log(room);
                  room.save(function (err) {
                    if (err) {
                      res.status(404).send('Update failed'+err);
                      return
                    }

                    res.send(room.notes.filter((n) => n._id==noteId)[0]);
                  });

                });

           }
)

router.post('/:roomId/notes/:noteId/content',
           passport.authenticate('jwt', { session: false }),
           function(req, res) {
              var roomId = req.params.roomId;
              var noteId = req.params.noteId;
              var content = req.body;
              if (!content) res.status(404).send('Bad parameters for POST request');
              //res.redirect(req.baseUrl+'/'+roomId+'/notes/'+noteId);

              Room.findOne({_id : roomId, 'notes._id' : noteId})
                .exec(function (err, room) {
                  if ((!room) || (err)) {
                     res.status(404).send('Room not found');
                     return;
                  }

                  for (var i = 0; i < room.notes.length; i++) {
                    if (room.notes[i]._id == noteId)
                        room.notes[i].content=content.content;
                  }



                  room.save(function (err) {
                    if (err) {
                      res.status(404).send('Update failed '+ err);
                      return
                    }

                    res.send(room.notes.filter((n) => n._id==noteId)[0]);
                  });

                });

           }
)

router.put('/:roomId/notes', passport.authenticate('jwt', { session: false }), function(req, res) {
  var roomId = req.params.roomId;
  var newNote = req.body;
  if (!newNote) res.status(404).send('Bad parameters for PUT request');
  Room.findOne({_id : roomId})
    .exec(function (err, room) {
      if (err) res.status(404).send('Room not found');
      room.notes.push({'content' : newNote.content,
                       'type' : newNote.type,
                       'pos' : {
                         'x' : newNote.pos.x,
                         'y' : newNote.pos.y
                       }});
      room.save(function (err) {
          if (err) res.status(404).send('Error with mongo'+err);
          res.redirect('/toto');
      });
    });

});


router.get('/:roomId', passport.authenticate('jwt', { session: false }), function(req, res) {
  var roomId = req.params.roomId;
  Room.findOne({_id : roomId})
    .exec(function (err, room) {
      if (err) res.status(404).send('Room not found');
      res.send(room)
    });

});


module.exports = router;
