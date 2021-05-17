import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ProgressBar from './ProgressBar'
import { projectFirestore } from '../firebase';


function Modal({ showModal, setShowModal, modalData }) {
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null)
    const [list, setList] = useState({})
    const [data, setData] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const listInputRef = useRef('');
    const titleRef = useRef('')
    const paragraphRef = useRef('')

    const collectionRef = projectFirestore.collection('notes');

    useEffect(() => {
       if(modalData){
            titleRef.current.value = modalData.title;
            paragraphRef.current.value = modalData.paragraph;
            setList({...modalData.list});
            // setFile(null);
       }
    }, [modalData])

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleFileChange = (e) => {
      let selected = e.target.files[0];
    console.log(selected);
      if(selected){
        if (types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpg)');
        }
      }
    };

    const addToList = () =>{
        if(listInputRef.current.value === ''){
            setError('Task cannot be empty string');
            return;
        }
        let taskValue = listInputRef.current.value.trim();
        let newList = {...list};
        let id = uuidv4();
        newList[id] = {
            task: taskValue,
            done: false
        };
        setList(newList);
        listInputRef.current.value = '';
    }

    const onCreateNote = () => {
        if(file === null && titleRef.current.value.trim() === '' && paragraphRef.current.value.trim() === '' && Object.keys(list).length === 0){
            setError('All fields cannot be empty, atleast one must be filled');
            return;
        }
        setData({
            file: file,
            title: titleRef.current.value.trim(),
            paragraph: paragraphRef.current.value.trim(),
            list: list
        });
        setIsUploading(true);
        // TODO : Somehow reset this values after uploadad to database
        titleRef.current.value = '';
        paragraphRef.current.value = '';
        setList({});
        setFile(null);
        setError('');
    }

    const onDeleteNote = () => {
        collectionRef.doc(modalData.id).delete().then(() => {
            setShowModal(false);
        }).catch((error) => {
            setError("Error removing document: ", error);
        });
        
    }

    const onUpdateNote = () => {
        let updateObj = {};
        if(titleRef.current.value.trim() !== modalData.title){
            updateObj.title = titleRef.current.value.trim();
        }
        if(paragraphRef.current.value.trim() !== modalData.paragraph){
            updateObj.paragraph = paragraphRef.current.value.trim();
        }
        updateObj.list = list;
        if(file !== null){
            updateObj.file = file
        }
        collectionRef.doc(modalData.id).update(updateObj)
        .then(() => setShowModal(false))
        .catch(error => setError("Error while updating: " + error));
    }
  

    return (
        <>
            <div className={showModal? "body-blackout is-blacked-out" : "body-blackout"} onClick={() => setShowModal(false)}></div>
            <div className={showModal? "popup-modal shadow is--visible" : "popup-modal shadow"} id="note-modal">
                <i className="bx bx-x popup-modal__close" onClick={() => setShowModal(false)}></i>
                <div className="popup-modal__container">
                    <h2>{modalData ? 'Edit Note' : 'New Note'}</h2>
                    {error && <p className="error-string">{error}</p>}
                    <div className="input__image input__cotainer">
                        <div>
                            <label htmlFor="file_input" className="img-input-label">Choose File</label>
                            {file ? file.name : modalData ? 'image cannot be updated righth now!' : 'No file selected'}
                        </div>
                        {modalData && modalData.imageURL && <img src={modalData.imageURL} height="100" alt="note_image" />}
                        <input 
                            type="file" 
                            name="file_input" 
                            id="file_input" 
                            className="img-input"
                            disabled={modalData ? true : false}
                            onChange={handleFileChange}
                        />
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
                            placeholder="Paragraph" 
                            className="input-box" 
                            ref={paragraphRef}
                        ></textarea>
                    </div>
                    <div className="input__list input__cotainer">
                            {
                                Object.keys(list).map((key, index) => (
                                    <div className="list-item" key={key}>
                                        <p className="list-item__title">{list[key].task}</p>
                                        <input
                                            type="checkbox" 
                                            checked={list[key].done} 
                                            onChange={()=> {
                                                let newList = {...list}
                                                newList[key] = {...list[key], done: !list[key].done}
                                                setList(newList);
                                            }} 
                                            name="done"
                                            className="list-item__checkbox" 
                                        />
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
                        { data && <ProgressBar data={data} setData={setData} setIsUploading={setIsUploading} />}
                        
                        {
                            modalData ? 
                            <div className="actions__container">
                                <button className="delete-note-btn" onClick={onUpdateNote} >Update Note</button> 
                                <button className="delete-note-btn" onClick={onDeleteNote} >Delete Note</button> 
                            </div>
                            : 
                            <button className="create-note-btn" onClick={onCreateNote}>{isUploading? 'Uploading...' : 'Create Note'}</button>
                        }
                </div>
            </div>
        </>
    )
}

export default Modal
