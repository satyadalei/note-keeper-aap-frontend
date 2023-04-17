import React,{ useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
export const AddNote = () => {
    const [note, setNote] = useState({
        title :"",
        description : "",
        tag : ""
    })
    const context = useContext(noteContext);
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
        })
    }
  return (
    <>
        <div className='container my-3'>
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input onChange={handleInput} type="text" className="form-control" id="title" name='title' aria-describedby="title" value={note.title} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input onChange={handleInput} type="text" className="form-control" id="tag" name="tag" value={note.tag} />
          </div>

          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input onChange={handleInput} type="text" className="form-control" id="desc" name="description" value={note.description} />
          </div>
          <button type="submit" onClick={handleAddNote} className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
