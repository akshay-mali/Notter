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
            setLoading(false);
            history.push("/");
        }catch{
            setLoading(false);
            setError("Failed to create an account");
        }

    }

    return (
        <div className="authform__container">
            <h2 className="authform__title">Signup</h2>
            {error && <p className="authform__error"> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="authform__input-field">
                    <label>Email</label>
                    <input type="email" ref={emailRef} required ></input>
                </div>
                <div className="authform__input-field">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required ></input>
                </div>
                <div className="authform__input-field">
                    <label>ConfirmPassword</label>
                    <input type="password" ref={confirmPasswordRef} required ></input>
                </div>
                <div className="authform__input-field">
                    <button disabled={loading} type="Submit" className="authform__btn">Signup</button>
                </div>
            </form>
            <div className="authform__direct">Already have a account? <Link to="/login">Login</Link></div>
        </div>
    )
}

export default Signup
