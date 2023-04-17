import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    
    return (
            <div className="card col-md-3 mx-2 my-3">
                    <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">
                                {note.description}
                            </p>
                        <div>
                            <i onClick={()=>{deleteNote(note._id)}}  className="fas fa-trash-alt mx-2"></i>
                            <i className="fas fa-edit mx-2"></i>
                        </div>
                    </div>            
            </div>
    )
}

export default NoteItem