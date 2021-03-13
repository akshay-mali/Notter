import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
        <div className="Dashboard">
            <h2>Dashboard</h2>
            {error && <p> { error } </p>}
            <strong>Email : </strong> <span>{currentUser.email}</span>
            <p><Link to="/profile" className="button">Got to Profile</Link></p>
            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}

export default Dashboard
