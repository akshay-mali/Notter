import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import NotesContainer from './NotesContainer';

function Dashboard() {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    return (
        <div className="dashboard">
            <Navbar handleLogout={handleLogout} error={error} />
            <button className="new-note" id="new-note-btn">
                <i className='bx bx-plus bx-md' ></i>
            </button>
            <NotesContainer />
        </div>
    )
}

export default Dashboard
