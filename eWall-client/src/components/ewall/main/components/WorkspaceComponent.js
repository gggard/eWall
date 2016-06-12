'use strict';

import React from 'react';
import NoteComponent from 'components/ewall/elements/components/NoteComponent'
import ToolbarComponent from 'components/ewall/main/components/ToolbarComponent'

import uuid from 'node-uuid'



require('styles/ewall/main/components/Workspace.sass');

class WorkspaceComponent extends React.Component {

/*
  static defaultProps = {
    }

  static propTypes = {
    //notes: React.PropTypes.array.isRequired
  }
*/

  state = {
    //notes: [{id : uuid.v4(), name : 'tata'},
    //        {id : uuid.v4(), name : 'titi'},
    //        {id : uuid.v4(), name : 'tafea'},
    //                {id : 2314, name : 'tfi'}],
    selectedNote: null
  }

    constructor(props) {
      super(props);
      this.onSelect = this.onSelect.bind(this)
      this.onDelete = this.onDelete.bind(this)
      this.onMove = this.onMove.bind(this)
      this.onContentChanged = this.onContentChanged.bind(this)
      console.log('WorkspaceComponent constructor', props)
    }


  onSelect(note) {
    if (this.state.selectedNote)
      console.log('old selected note', this.state.selectedNote.props.id)
    console.log('changing to', note.props.id)
    if (this.state.selectedNote && !(this.state.selectedNote===note)) this.state.selectedNote.unselect();
    this.setState({ selectedNote : note });
  }

  onMove(note, newX, newY) {
    this.props.onNoteMove(note, newX, newY);
  }

  onContentChanged(note, content) {
    this.props.onContentChanged(note, content);
  }

  onDelete(note) {
    console.log('delete ', note);
    if (this.state.selectedNote && !(this.state.selectedNote===note)) this.setState({ selectedNote : null });

    this.props.onNoteDelete(note);
/*
    for(var i = this.props.notes.length - 1; i >= 0; i--) {
      console.log('check index ', i, this.props.notes[i]);
      if(this.props.notes[i].id === note.props.id) {
        // TODO Something to optimise ?
        var newData = this.state.notes.slice(); //copy array
        newData.splice(i, 1); //remove element
        this.setState({notes: newData}); //update state
        console.log('delete index ', i);
      }
    }
*/
  }

  render() {

    var notesNodes = <span></span>
    if (this.props.notes) {
    notesNodes = this.props.notes.map(function(note) {
      return (
        <NoteComponent note={note}
            initialPos={note.pos} key={note._id} ref={note._id} id={note._id}
            roomId={this.props.roomId}
            onSelect={this.onSelect} onDelete={this.onDelete}
            onMove={this.onMove}
            onContentChanged={this.onContentChanged}
            initialContent={note.content}/>
      );
    }, this);
    }
      //<ToolbarComponent onAddNote={this.addNote}/>
    return (
      <div className="workspace-component">
        {notesNodes}
      </div>
    );
  }
}

WorkspaceComponent.displayName = 'EwallMainComponentsWorkspaceComponent';

// Uncomment properties you need
// WorkspaceComponent.propTypes = {};
// WorkspaceComponent.defaultProps = {};

export default WorkspaceComponent;
