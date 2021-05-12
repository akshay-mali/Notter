import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ProgressBar from './ProgressBar'

function Modal({ showModal, setShowModal }) {
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null)
    const [list, setList] = useState([])
    const [data, setData] = useState(null)

    const listInputRef = useRef('');
    const titleRef = useRef('')
    const paragraphRef = useRef('')

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleFileChange = (e) => {
      let selected = e.target.files[0];
  
      if (types.includes(selected.type)) {
        setFile(selected);
        setError('');
      } else {
        setFile(null);
        setError('Please select an image file (png or jpg)');
      }
    };

    const addToList = () =>{
        if(listInputRef.current.value === ''){
            setError('Task cannot be empty string');
            return;
        }
        let taskValue = listInputRef.current.value.slice();
        setList(prevList => {
            return [...prevList, {
                id: uuidv4(),
                task: taskValue,
                done: false
            }]
        });
        listInputRef.current.value = '';
    }

    const onCreateNote = () => {
        if(file === null && titleRef.current.value.trim() === '' && paragraphRef.current.value.trim() === '' && list.length === 0){
            setError('All fields cannot be empty, atleast one must be filled');
            return;
        }
        setData({
            file: file,
            title: titleRef.current.value.trim(),
            paragraph: paragraphRef.current.value.trim(),
            list: list
        });
        // TODO : Somehow reset this values after uploadad to database
        titleRef.current.value = '';
        paragraphRef.current.value = '';
        setList([]);
        setFile(null);
        setError('');
        // console.log(data);
    }
  

    return (
        <>
            <div className={showModal? "body-blackout is-blacked-out" : "body-blackout"} onClick={() => setShowModal(false)}></div>
            <div className={showModal? "popup-modal shadow is--visible" : "popup-modal shadow"} id="note-modal">
                <i className="bx bx-x popup-modal__close" onClick={() => setShowModal(false)}></i>
                <div className="popup-modal__container">
                    <h2>New Note</h2>
                    {error && <p className="error-string">{error}</p>}
                    <div className="input__image input__cotainer">
                        <input 
                            type="file" 
                            name="" 
                            id="" 
                            className="img-input"
                            onChange={handleFileChange}
                        />
                        {/* TODO : use label and make input display:none as cannot update value programatically */}
                    </div>
                    <div className="input__title input__cotainer">
                        <input 
                            type="text" 
                            id="titleInput" 
                            placeholder="Title" 
                            className="input-box" 
                            ref={titleRef}
                        />
                    </div>
                    <div className="input__para input__cotainer">
                        <textarea 
                            type="text" 
                            id="paragraphInput" 
                            style={{resize: 'vertical'}} 
                            placeholder="Paragraph" 
                            className="input-box" 
                            ref={paragraphRef}
                        ></textarea>
                    </div>
                    <div className="input__list input__cotainer">
                            {
                                list.map((item, index) => (
                                    <div className="list-item" key={index}>
                                        <p className="list-item__title">{item.task}</p>
                                        {/* <input type="checkbox" checked={item.done} onChange={()=> setList(prevList => {prevList[index].done = !done;return prevList})} name="done" className="list-item__checkbox" /> */}
                                        <input type="checkbox" name="done" className="list-item__checkbox" />
                                    </div>
                                ))
                            }
                        <div className="list-form">
                            <input 
                                type="text" 
                                className="list-input" 
                                placeholder="Enter task" 
                                ref={listInputRef}
                            />
                            <button className="add-list-btn" onClick={addToList}>Add item</button>
                        </div>
                    </div>
                    { data && <ProgressBar data={data} setData={setData} />}
                    <button className="create-note-btn" onClick={onCreateNote}>Create Note</button>
                </div>
            </div>
        </>
    )
}

export default Modal
