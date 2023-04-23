import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';
import AlertContext from '../context/alerts/alertContext';
import { useNavigate } from 'react-router-dom';
import LogInContext from '../context/loginStatus/loginContext';


function Notes() {
  const context = useContext(noteContext);
  const logInContext = useContext(LogInContext);
  const {logInStatus} = logInContext;
  const { notes, fetchAllNotes, editNote } = context;
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const navigate = useNavigate();
  useEffect(() => {
    if (logInStatus){
      fetchAllNotes();
    }else{
      navigate("/login");
    }
    
  },[fetchAllNotes, logInStatus, navigate]);
  const ref = useRef(null);
  // show default note credentials after button is clicked
  const [currentEditNote, setCurrentEditNote] = useState({
    _id: "",
    title : "",
    tag : "",
    description : ""
  });
  // ------------- when someone clicks on editing note  icon
  const updateNote = async(note) => {
    ref.current.click();
    setCurrentEditNote(note);
  }
  //----handle onChange event( save title, tag, description) when note is being edited ---
  const handleEditingNote = (e)=>{
    setCurrentEditNote({...currentEditNote, [e.target.name] : e.target.value});
  }
  //  when editing is done then clicking on save changes button -----
  const saveEditedNote = ()=>{
    // then send saved data to notestate to save in data base
    editNote(currentEditNote);
    ref.current.click();  // close update modal 
    setAlert({
      message : "Saved changes Successfully",
      alertType : "success"
    })
  }

  return (
    <>
      <button hidden type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Click To See Modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* ---------modal body --------------- */}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input onChange={handleEditingNote}  type="text" className="form-control" id="title" name='title' aria-describedby="title" value={currentEditNote.title} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input onChange={handleEditingNote} value={currentEditNote.tag} minLength={5} required type="text" className="form-control" id="tag" name="tag"  />
                </div>

                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <input onChange={handleEditingNote} value={currentEditNote.description} minLength={5} required  type="text" className="form-control" id="desc" name="description" />
                </div>
              </form>
              {/* ---------modal body --------------- */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={currentEditNote.title.length < 5  || currentEditNote.description.length < 5} onClick={()=>{saveEditedNote()}} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />
      <div className='row my-3'>
        <h1>Your all note</h1>
        <div className="container mx-1">
         {notes.length === 0 && "You do't have any notes!"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          )
        })}
      </div>
    </>
  )
}

export default Notes