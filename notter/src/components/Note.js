import React from 'react';
import { projectFirestore } from '../firebase';

function Note({ note, index, handleEditNoteOnClick }) {

    const collectionRef = projectFirestore.collection('notes');

    const handleChecked = (key, val) => {
        collectionRef.doc(note.id).update({
            [`list.${key}.done`]: !val
        });
    }

    return (
        <div className="card">
            <button className="card__edit-btn" onClick={() => handleEditNoteOnClick(note)}><i className='bx bx-pencil bx-xs' ></i></button>
            {note.imageURL && 
                <div className="card__image">
                    {note.imageURL && <img src={note.imageURL} alt="" className="img" />}
                </div>
            }
            {(note.title || note.paragraph) && 
                <div className="card__text" style={{borderBottom: Object.keys(note.list).length !== 0? '1px solid #ECECEC' : ''}}>
                    <h3 className="card__title">{note.title}</h3>
                    <p className="card__paragraph">
                        {note.paragraph}
                    </p>
                </div>
            }
            {
                Object.keys(note.list).length !== 0 && <ul className="card__checklist">
                    {
                        Object.keys(note.list).map(key => (
                            <li className="card__checklist-item completed" key={key}>
                                <input type="checkbox" name="" checked={note.list[key].done} onChange={() => handleChecked(key, note.list[key].done)}/>
                                <span style={{textDecoration: note.list[key].done? 'line-through' : 'none'}}>{note.list[key].task}</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default Note
