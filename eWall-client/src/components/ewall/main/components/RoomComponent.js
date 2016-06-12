'use strict';
import React from 'react';


import RoomActions from '../../../../actions/RoomActions'

import RoomStore from '../../../../stores/RoomStore'

import ToolbarComponent from './ToolbarComponent'
import Slider from 'react-slick';

import WorkspaceComponent from './WorkspaceComponent'
import NetworkErrorComponent from './widgets/NetworkErrorComponent'

import { browserHistory } from 'react-router'

import io from 'socket.io-client'
let socket = io(`http://localhost:9090`,
                { query: "jwt="+localStorage.getItem('jwt') })

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

require('styles/ewall/main/components/Room.sass');

class RoomComponent extends React.Component {

  constructor(props) {
    super(props);

    console.log('RoomComponent contructor id=', this.props.params.roomId)
    //this.state = { id : this.props.params.roomId }

    //alt.createStore(RoomStore, 'RoomStore', this.props.params.roomId);
    this.state = RoomStore.getState();
    this.onChange = this.onChange.bind(this);


    this.onAddNote = this.onAddNote.bind(this);
    this.onNoteMove = this.onNoteMove.bind(this);
    this.onNoteDelete = this.onNoteDelete.bind(this);
    this.onSocketNoteDrag = this.onSocketNoteDrag.bind(this);
    this.onSocketUserEntering = this.onSocketUserEntering.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
    //
    //
    // this.handleOnClick = this.handleOnClick.bind(this);
    //
    RoomActions.fetch(this.props.params.roomId);

  }

  componentDidMount() {
    RoomStore.listen(this.onChange);
    socket.emit("subscribe", { room: this.props.params.roomId });
    socket.on('noteDrag', this.onSocketNoteDrag);
    socket.on('userEntering', this.onSocketUserEntering);
    }

  componentWillUnmount() {
    RoomStore.unlisten(this.onChange);
    socket.emit("unsubscribe", { room: this.props.params.roomId });
  }

  onSocketUserEntering(data) {
    console.log("[RoomComponent] userEntering",data);
    this.refs.toastContainer.success(
      data.user,
      data.user + " enter the room", {
      timeOut: 3000,
      extendedTimeOut: 10000
    });
  }

  onSocketNoteDrag(data) {
    console.log('onSocketDrag', data);
    this.setState(function(previousState, currentProps) {
      var room = previousState.room;
      room.notes = previousState.room.notes.map(function(note) {
        if (note._id==data.noteId) {
          console.log('found noteID', data.noteId)
          note.pos.x = data.position.x;
          note.pos.y = data.position.y;
        }
        return note;
      });
      //console.log("New state", room);
      return {'room': room};
    });
  }

  onChange(state) {
    console.log('RoomComponent onChange', state)
    this.setState(state);
  }

  onAddNote() {
    RoomActions.createNote(this.state.room);
  }

  onNoteMove(note, newX, newY) {
    RoomActions.moveNote(this.state.room, note, { 'x' : newX, 'y' : newY  });
  }

  onContentChanged(note, content) {
    RoomActions.updateNoteContent(this.state.room, note, content);
  }

  onNoteDelete(note) {
    RoomActions.deleteNote(this.state.room, note);
  }


  render() {

    console.log('[RoomComponent] render ',this.state.room);

    return (
      <div className="room-component">

      <ToastContainer ref="toastContainer"
                       toastMessageFactory={ToastMessageFactory}
                       className="toast-top-right" />

      { (this.state.error) && (typeof this.state.error != 'undefined') ? <NetworkErrorComponent error={this.state.error}/> : null }


      <ToolbarComponent onAddNote={this.onAddNote} title={this.state.room.name}/>

      <WorkspaceComponent notes={this.state.room.notes}
         roomId={this.state.room._id}
         onNoteMove={this.onNoteMove}
         onNoteDelete={this.onNoteDelete}
         onContentChanged={this.onContentChanged} />
      </div>
    );
  }
}

export default RoomComponent
