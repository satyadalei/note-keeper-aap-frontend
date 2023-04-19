import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  //first fetch all notes from database through server
  const initialNotes = [];
  const [notes, setnotes] = useState(initialNotes);

  //----------- First fetch all notes from data base ---------------------
  const fetchAllNotes = async ()=>{
      const url = `${host}api/note/fetchallnotes`; 
      const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzhmMDJlYmVjNzYxYWE1YTk1NzM4ZiIsImlhdCI6MTY4MTQ1MzEwM30.74ieEKJGr4aTSiAQfD-Cv-DPGYZ9DHdvY8XTd17m-SA",
          }
      });
      const json = await response.json();
      setnotes(json); // after fetching all notes store it in a state
  }

  //---------------------- Add note to data base & display in page-----------
  const addNote = async ({ title, description, tag }) => {
    //call api
    const url = `${host}api/note/addnote`; 
    const data = {title, description, tag};
    const response = await fetch(url, {
      method: "POST",// what to do
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzhmMDJlYmVjNzYxYWE1YTk1NzM4ZiIsImlhdCI6MTY4MTQ1MzEwM30.74ieEKJGr4aTSiAQfD-Cv-DPGYZ9DHdvY8XTd17m-SA",
      },
      body: JSON.stringify(data), // sending data to server
    });
     const savedNote = await response.json();
    setnotes(notes.concat(savedNote));

  }

  //------------------- update/ edit note --------------------
  // here edited note comes as {_id: '643da..', userId: '6438f..', title: 'go... ', description: 'go home...', tag: 'home na.', …}
    const editNote = async ({_id, title, description, tag}) => {
    //API CALL\
    const url = `${host}api/note/updatenote/${_id}`;
    // store what data will be updated through api
    const data = {title, description, tag};

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzhmMDJlYmVjNzYxYWE1YTk1NzM4ZiIsImlhdCI6MTY4MTQ1MzEwM30.74ieEKJGr4aTSiAQfD-Cv-DPGYZ9DHdvY8XTd17m-SA"
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // it helps to make a carbon copy of array
    const newData = JSON.parse(JSON.stringify(notes));
    // it will update the edited note 
    for (let index = 0; index < notes.length; index++) {
      if(newData[index]._id === json._id){
        newData[index].title = json.title;
        newData[index].description = json.description;
        newData[index].tag = json.tag;
        break;
      }
    }
    // const newEditedNote = notes.filter((note,index)=>{
    //     // check if previous id is same as edited id then replace newly saved 
    //   if(note._id === json._id){
    //     console.log(note);
    //     console.log(index);
    //     //return that saved note
    //     console.log(json);
    //     return json;
    //   }else{
    //       // otherwise return same element
    //       console.log(note);
    //       return note;
    //   }
    // })
    // //set all notes again
    setnotes(newData);
    // console.log(newEditedNote);
  }
  //-------------------------delete note ---------------------
  const deleteNote = async (id) => {
    const url = `${host}api/note/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzhmMDJlYmVjNzYxYWE1YTk1NzM4ZiIsImlhdCI6MTY4MTQ1MzEwM30.74ieEKJGr4aTSiAQfD-Cv-DPGYZ9DHdvY8XTd17m-SA"
      }
    });
    const newNotes = notes.filter((note)=>{
       return note._id !== id
    });
    setnotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,fetchAllNotes}} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;