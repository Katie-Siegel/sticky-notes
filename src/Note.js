import React from "react";
const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "description", updatedValue);
  };

  const deleteNote = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        aria-label="note title"
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        aria-label="note description"
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
