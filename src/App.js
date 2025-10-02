import React from "react";
import Header from "./Header";
import NoteBoard from "./NoteBoard";
import { Component } from "react";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
    searchText: "",
  };

  addNote = (e) => {
    //create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };

    //Add the new note to the existing array
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  //updateing text in note titles and description
  onType = (noteID, updatedKey, updatedValue) => {
    //noteID == id of the note that is edited
    //updatedKey == title or description field
    //updateValue == value of title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== noteID) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  //searching for specific note content
  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText,
    });
  };

  removeNote = (noteID) => {
    const filteredNotes = this.state.notes.filter((note) => note.id !== noteID);
    this.setState({ notes: filteredNotes });
  };

  componentDidUpdate() {
    const stringifedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifedNotes);
  }

  componentDidMount() {
    const stringifedNotes = localStorage.getItem("savedNotes");
    if (stringifedNotes) {
      const savedNotes = JSON.parse(stringifedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NoteBoard
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
