'use strict';

import React from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from  'react-markdown';
import Icon from 'react-fa'



import io from 'socket.io-client'
let socket = io(`http://localhost:9090`)

require('styles/ewall/elements/components/Note.sass');

class NoteComponent extends React.Component {

  constructor(props) {
    super(props);

    console.log('[NoteComponent] constructor ',props);

    this.state = {selected : false, edit : false, content : props.initialContent,
                  dragCounter : 0,
                  note: props.note};

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    }

 handleStart() {
   console.log('drag start');
 }
 handleStop(e: Event, data: DraggableData) {
   console.log('drag stop at ',data);

   this.setState({selected : true});
   this.props.onSelect(this);


   if ((this.state.note.pos.x == data.x)
      && (this.state.note.pos.y == data.y)) return;

   console.log('[NoteComponent] propagating change')
   this.props.onMove(this.state.note, data.x, data.y);

 }

 handleDrag(e: Event, data: DraggableData) {
      //console.log('drag');
      socket.emit('noteDrag', { 'roomId' : this.props.roomId,
                                'noteId' : this.state.note._id,
                                'position' : {'x' : data.x, 'y' : data.y }});
 }

 handleFinish () {
   this.setState({edit : false});
   this.props.onContentChanged(this.state.note,this.state.content);
 }

 handleUndo () {
   this.setState({edit : false, content : this.state.previousContent});
 }

  handleOnClick() {
      //console.debug('handleOnClick');

  }

  unselect() {
    //console.debug('unselect');
    this.setState({selected : false, edit : false});
  }

  handleDelete() {
    //console.log('delete');
    this.props.onDelete(this.state.note);
  }

    handleEdit() {
      this.setState({edit : true, previousContent : this.state.content});
      console.log('edit');
    }

handleInput(event) {
 this.setState({content: event.target.value});
 socket.emit('noteEdit', { 'roomId' : this.props.roomId,
                           'noteId' : this.state.note._id,
                           'content' : event.target.value });
}

  render() {
    var className = 'note-component';
    var toolbar = <div className='note-toolbar'></div>
    var body = <span><ReactMarkdown source={this.state.content}/></span>
    if (this.state.selected) {
      className = 'note-component-selected';
      toolbar = <div className='note-toolbar'>
        <ul className="list-inline">
         <li><a onClick={this.handleEdit}><Icon name="edit" /></a></li>
         <li><a onClick={this.handleDelete}><Icon name="remove" /></a></li>
         <li><a onClick={this.handleColor}><Icon name="paint-brush" /></a></li>
        </ul>
      </div>
    }
    if (this.state.edit) {
      body = <textarea className="form-control" onInput={this.handleInput}>{this.state.content}</textarea>
      toolbar = <div className='note-toolbar'>
        <ul className="list-inline">
         <li><a onClick={this.handleFinish}><Icon name="check" /></a></li>
         <li><a onClick={this.handleUndo}><Icon name="undo" /></a></li>
        </ul>
      </div>
    }

      //position={this.props.initialPos}
    return (
      <Draggable defaultPosition={this.props.initialPos}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        disabled={this.state.edit}
        ref='draggable'>
      <div>
        <div  className={className} onClick={this.handleOnClick}>
        <div className='note-component-content'>
        {body}
        </div>
        </div>
        {toolbar}
      </div>
      </Draggable>
    );
  }
}

NoteComponent.displayName = 'EwallElementsComponentsNoteComponent';

// Uncomment properties you need
// NoteComponent.propTypes = {};
// NoteComponent.defaultProps = {};

export default NoteComponent;
