var alt = require('../alt');
var RoomActions = require('../actions/RoomActions');

class RoomStore {

  constructor(id) {
    this.room = {id : id};
    this.bindListeners({
      handleUpdateRoom: RoomActions.UPDATE_ROOM,
      handleFetch : RoomActions.FETCH,
      handleRoomFailed: RoomActions.ROOM_FAILED
    });
  }


  handleUpdateRoom(room) {
    this.room = room;
  }

  handleFetch() {
  }


  handleRoomFailed(error) {
    this.errorMessage = error.statusText;
    this.error = error;
    this.room = {};
  }
}


module.exports = alt.createStore(RoomStore, 'RoomStore');
