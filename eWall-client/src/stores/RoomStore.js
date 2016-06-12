var alt = require('../alt');
var RoomActions = require('../actions/RoomActions');

class RoomStore {

  constructor(id) {
    this.room = {id : id};
    this.bindListeners({
      handleUpdateRoom: RoomActions.UPDATE_ROOM,
      handleFetch : RoomActions.FETCH,
      handleRoomFailed: RoomActions.ROOM_FAILED,
      handleDeleteNote: RoomActions.DELETE_NOTE
    });
  }


  handleUpdateRoom(room) {
    this.room = room;
  }

  handleFetch() {
  }

  handleDeleteNote(noteId) {
    console.log('[RoomStore] handleDeleteNote', noteId)
    for (var i = 0; i < this.room.notes.length; i++) {
      if (this.room.notes[i]._id == noteId) {
          this.room.notes.splice(i,1);
          break;
      }
    }

  }


  handleRoomFailed(error) {
    this.errorMessage = error.statusText;
    this.error = error;
    this.room = {};
  }
}


module.exports = alt.createStore(RoomStore, 'RoomStore');
