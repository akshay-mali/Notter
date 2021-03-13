import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            setMessage('');
            setError('');
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions.')
        }catch{
            setError("Failed to Reset Password");
        }

        setLoading(false);
    }

    return (
        <div className="LoginForm">
            <h2>Password Reset</h2>
            {message && <p> { message } </p>}
            {error && <p> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="input-field">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required ></input>
                </div>
                <div className="input-field">
                    <button disabled={loading} type="Submit" >Reset Password</button>
                </div>
            </form>
            <div> <Link to="/login">Login</Link> </div>
            <div>Need an account? <Link to="/signup">Signup</Link></div>
        </div>
    )
}

export default ForgotPassword
