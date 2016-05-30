import 'whatwg-fetch';

var RoomActions = require('../actions/RoomActions');

var RoomSource = {

  createNote: function(roomId,note) {
    return new Promise(function (resolve, reject) {
      fetch('http://localhost:9090/api/rooms/'+roomId+'/notes', {
          method: 'PUT',
          body: JSON.stringify(note),
          headers: {
            'Authorization' : localStorage.getItem('jwt'),
		        'Content-Type': 'application/json'
          }
       })
    })
  },

  moveNote: function(roomId, noteId, pos) {
    console.log('[RoomSource] moveNote', roomId, noteId, pos);
    return new Promise(function (resolve, reject) {
      fetch('http://localhost:9090/api/rooms/'+roomId+'/notes/'+noteId+'/position', {
        method: 'POST',
        body: JSON.stringify({
          'pos' : pos
        }),
        headers: {
          'Authorization' : localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        }

    })
    .then (function (response) {
      console.log('[RoomSource] moveNote then ', response)
    })
    .catch(function(error) {
       console.log('Error move room : ' + error.message);
       reject(error.message);
    })
  })
},

updateNoteContent: function(roomId, noteId, content) {
  console.log('[RoomSource] updateNoteContent', roomId, noteId, content);
  return new Promise(function (resolve, reject) {
    fetch('http://localhost:9090/api/rooms/'+roomId+'/notes/'+noteId+'/content', {
      method: 'POST',
      body: JSON.stringify({
        'content' : content
      }),
      headers: {
        'Authorization' : localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      }

  })
  .then (function (response) {
    console.log('[RoomSource] updateNoteContent then ', response)
  })
  .catch(function(error) {
     console.log('Error updateNoteContent : ' + error.message);
     reject(error.message);
  })
})
},

  fetch: function(roomId) {
    return new Promise(function (resolve, reject) {
      fetch('http://localhost:9090/api/rooms/'+roomId, {
          method: 'GET',
          headers: {
            'Authorization' : localStorage.getItem('jwt')
          }
      })
      .then (function (response) {
        console.log(response)
        if(response.ok) {
          response.json().then(function(jsonResponse) {
            resolve(jsonResponse);
          })
        } else {
          console.log('reject : ', response)
          reject(response);
        }
      })
      .catch(function(error) {
         console.log('Error fetch room : ' + error.message);
         reject(error.message);
      });
    });
  }


};

export default RoomSource;
