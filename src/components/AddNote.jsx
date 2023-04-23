import React,{ useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import AlertContext from '../context/alerts/alertContext';

export const AddNote = () => {
    const alertContext = useContext(AlertContext);
    const {alert,setAlert} = alertContext;
    const [note, setNote] = useState({
        title :"",
        description : "",
        tag : ""
    })
    const context = useContext(NoteContext);
    const {addNote} = context;
    const handleInput = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleAddNote = async (e)=>{
        e.preventDefault();
        await addNote(note);
        setNote({
            title :"",
            description : "",
            tag : ""
        });
        //After addition of note set an alert message
        setAlert({
          message : "Note Added Successfully",
          alertType : "success"
        })
    }
  return (
    <>
        <div className='container my-3'>
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input autoComplete='off' onChange={handleInput} type="text" className="form-control" id="title" name='title' aria-describedby="title" value={note.title} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input autoComplete='off' onChange={handleInput} type="text" className="form-control" id="tag" name="tag" value={note.tag} minLength={5} required />
          </div>

          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input onChange={handleInput} type="text" className="form-control" id="desc" name="description" value={note.description} minLength={5} autoComplete='off' required />
          </div>
          <button disabled={ note.title.length < 5 || note.description.length < 5 } type="submit" onClick={handleAddNote} className="btn btn-primary">Add note</button>
        </form>
      </div>
    </>
  )
}
