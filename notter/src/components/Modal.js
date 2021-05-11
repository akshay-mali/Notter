import React from 'react'

function Modal({ showModal, setShowModal }) {

    return (
        <>
            <div className={showModal? "body-blackout is-blacked-out" : "body-blackout"} onClick={() => setShowModal(false)}></div>
            <div className={showModal? "popup-modal shadow is--visible" : "popup-modal shadow"} id="note-modal">
                <i className="bx bx-x popup-modal__close" onClick={() => setShowModal(false)}></i>
                <div className="popup-modal__container">
                    <h2>New Note</h2>
                    <div className="input__image input__cotainer">
                        <input type="file" name="" id="" className="img-input" />
                    </div>
                    <div className="input__title input__cotainer">
                        <input type="text" id="titleInput" placeholder="Title" className="input-box"/>
                    </div>
                    <div className="input__para input__cotainer">
                        <textarea type="text" id="titleInput" style={{resize: 'vertical'}} placeholder="Paragraph" className="input-box"></textarea>
                    </div>
                    <div className="input__list input__cotainer">
                        <div className="list-item">
                            <p className="list-item__title">Get Grocessary</p>
                            <input type="checkbox" name="done" className="list-item__checkbox" />
                        </div>
                        <button className="add-list-btn">Add item</button>
                    </div>
                    <button className="create-note-btn">Create Note</button>
                </div>
            </div>
        </>
    )
}

export default Modal
