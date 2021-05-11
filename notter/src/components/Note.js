import React from 'react'

function Note({ note, index }) {
    return (
        <div className="card">
            {note.imageURL && <div className="card__image">
                {note.imageURL && <img src={note.imageURL} alt="" className="img" />}
            </div>}
            {(note.title || note.paragraph) && <div className="card__text" style={{borderBottom: note.list.length!==0? '1px solid #ECECEC' : ''}}>
                <h3 className="card__title">{note.title}</h3>
                <p className="card__paragraph">
                    {note.paragraph}
                </p>
            </div>}
            {note.list.length!==0 && <ul className="card__checklist">
                {
                    note.list.map(item => (
                        <li className="card__checklist-item completed" key={item.id}>
                            <input type="checkbox" name="" checked={item.done} onChange={() => {}}/>
                            <span style={{textDecoration: item.done? 'line-through' : 'none'}}>{item.task}</span>
                        </li>
                    ))
                }
            </ul>}
        </div>
    )
}

export default Note
