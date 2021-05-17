import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';
import Navbar from './Navbar';
import NotesContainer from './NotesContainer';

function Dashboard() {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null)

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    const handleNewNoteOnClick = () => {
        setShowModal(true);
        setModalData(null);
    }

    const handleEditNoteOnClick = (note) => {
        setShowModal(true);
        setModalData(note);
    }

    return (
        <div className="dashboard">
            <Navbar handleLogout={handleLogout} error={error} currentUser={currentUser} />
            <button className="new-note" id="new-note-btn" onClick={handleNewNoteOnClick}>
                <i className='bx bx-plus bx-md' ></i>
            </button>
            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalData={modalData} />}
            <NotesContainer handleEditNoteOnClick={handleEditNoteOnClick} />
        </div>
    )
}

export default Dashboard
