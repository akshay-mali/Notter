import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords donot match');
        }

        try{
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        }catch{
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <div className="SignupForm">
            <h2>Signup</h2>
            {error && <p> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="input-field">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required ></input>
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required ></input>
                </div>
                <div className="input-field">
                    <label>ConfirmPassword</label>
                    <input type="password" ref={confirmPasswordRef} required ></input>
                </div>
                <div className="input-field">
                    <button disabled={loading} type="Submit" >Signup</button>
                </div>
            </form>
            <div>Already have a account? <Link to="/login">Login</Link></div>
        </div>
    )
}

export default Signup
