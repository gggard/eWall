'use strict';

var alt = require('../alt');

import RoomSource from '../sources/RoomSource'

class RoomActions {
  updateRoom(room) {
    return room;
  }

  fetch(roomId) {
    return (dispatch) => {
      dispatch();
      RoomSource.fetch(roomId)
        .then((room) => {this.updateRoom(room);})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.roomFailed(errorMessage);
        });
    }
  }

 createNote(room) {
   console.log('[RoomActions] create note for room ',room)
   return (dispatch) => {
     dispatch();
     RoomSource.createNote(room._id, {'content' : 'new note',
                                      'type' : 'postit',
                                      'pos' : {
                                        'x' : 0,
                                        'y' : 0
                                      }})
        .then((room) => {console.log("createNote then")})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.roomFailed(errorMessage);
        })
   }
 }

 deleteNote(room, note) {
   console.log('[RoomActions] delete note for room ',room, ' note ', note)
   return (dispatch) => {
     dispatch();
     RoomSource.deleteNote(room._id, note._id)
        .then((room) => {console.log("deleteNote then")})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.roomFailed(errorMessage);
        })
   }
 }

 moveNote(room, note, newPos) {
   console.log('[RoomActions] move note for room ',room, ' note ', note, ' pos ', newPos)
   return (dispatch) => {
     dispatch();
     RoomSource.moveNote(room._id, note._id, {
                                      'pos' : {
                                        'x' : newPos.x,
                                        'y' : newPos.y
                                      }})
        .then((room) => {console.log("moveNote then")})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.roomFailed(errorMessage);
        })
   }
 }

 updateNoteContent(room, note, content) {
   console.log('[RoomActions] update note content for room ',room, ' note ', note, ' content ', content)
   return (dispatch) => {
     dispatch();
     RoomSource.updateNoteContent(room._id, note._id, content)
        .then((room) => {console.log("updateNoteContent then")})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.roomFailed(errorMessage);
        })
   }
 }


roomFailed(errorMessage) {
  return errorMessage;
}
  }


module.exports = alt.createActions(RoomActions);
