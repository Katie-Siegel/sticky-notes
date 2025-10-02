import React from "react";
const Note = (props) => {
  //updates title text
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "title", updatedValue);
  };
  //updates description text
  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "description", updatedValue);
  };
  //deletes note
  const deleteNote = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={deleteNote}>
        X
      </span>
    </li>
  );
};

export default Note;
