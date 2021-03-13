import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {currentUser, updateEmail, updatePassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        setError('');
        setLoading(true);

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords donot match');
        }

        const promises = [];
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            history.push("/profile");
        }).catch(() => {
            setError("Failed to update account");
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        <div className="SignupForm">
            <h2>Update Profile</h2>
            {error && <p> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="input-field">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required defaultValue={currentUser.email} ></input>
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} placeholder="Leave blank to keep the same" ></input>
                </div>
                <div className="input-field">
                    <label>ConfirmPassword</label>
                    <input type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same" ></input>
                </div>
                <div className="input-field">
                    <button disabled={loading} type="Submit" >Update</button>
                </div>
            </form>
            <div><Link to="/profile">Cancle</Link></div>
        </div>
    )
}

export default UpdateProfile
