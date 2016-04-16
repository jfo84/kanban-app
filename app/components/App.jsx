// import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   notes: [
    //     {
    //       id: uuid.v4(),
    //       task: 'Learn Webpack'
    //     },
    //     {
    //       id: uuid.v4(),
    //       task: 'LEARN REACT'
    //     },
    //     {
    //       id: uuid.v4(),
    //       task: 'Do dishes'
    //     }
    //   ]
    // };
    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    this.setState(state);
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}/>
      </div>
    );
  }

  // addNote = () => {
  //   this.setState({
  //     notes: this.state.notes.concat([{
  //       id: uuid.v4(),
  //       task: 'NEEEEEEWWWWWWWMMMMMMAAAAAANNNNN'
  //     }])
  //   })
  // }
  addNote() {
    NoteActions.create({task: 'New Task'});
  }

  // editNote = (id, task) => {
  //   if(!task.trim()) {
  //     return;
  //   }
  //
  //   const notes = this.state.notes.map(note => {
  //     if(note.id === id && task) {
  //       note.task = task;
  //     }
  //
  //     return note;
  //   })
  //
  //   this.setState({notes});
  // }
  editNote(id, task) {
    // Don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }

  // deleteNote = (id, e) => {
  //   e.stopPropagation();
  //
  //   this.setState({
  //     notes: this.state.notes.filter(note => note.id !== id)
  //   });
  // };
  deleteNote(id, e) {
    e.stopPropagation();
    NoteActions.delete(id);
  }
}
