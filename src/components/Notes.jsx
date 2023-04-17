import React,{ useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';

function Notes() {
  const context = useContext(noteContext);
  const {notes, fetchAllNotes} = context;
  useEffect(() => {
    fetchAllNotes();
  },[])
  
  return (
   <>
   {/* <div className='container my-3'>
        <h1>Your all note</h1>
      </div> */}
    <AddNote/>
    <div className='row my-3'>
    <h1>Your all note</h1>
        {notes.map((note)=>{
          return(
              <NoteItem key={note._id}  note={note} />
          )
        })}
    </div>
   </>
  )
}

export default Notes