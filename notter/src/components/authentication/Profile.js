import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
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
            <h2>Profile</h2>
            {error && <p> { error } </p>}
            <strong>Email : </strong> <span>{currentUser.email}</span>
            <p><Link to="/" className="button">Go to Dasahboard</Link></p>
            <p><Link to="/update-profile" className="button">Update Profile</Link></p>
            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}

export default Profile
