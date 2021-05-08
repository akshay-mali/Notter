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
        <div className="authform__container">
            <h2 className="authform__title">Password Reset</h2>
            {message && <p> { message } </p>}
            {error && <p className="authform__error"> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="authform__input-field">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required ></input>
                </div>
                <div className="authform__input-field">
                    <button disabled={loading} type="Submit" className="authform__btn">Reset Password</button>
                </div>
            </form>
            <div className="authform__direct">Already have an account? <Link to="/login">Login</Link> </div>
            <div className="authform__direct">Need an account? <Link to="/signup">Signup</Link></div>
        </div>
    )
}

export default ForgotPassword
