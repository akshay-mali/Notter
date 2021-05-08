import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push("/");
        }catch{
            setLoading(false);
            setError("Failed to sign in.");
        }

    }

    return (
        <div className="authform__container">
            <h2 className="authform__title">Login</h2>
            {error && <p className="authform__error"> { error } </p>}
            <form onSubmit={handleSubmit} >
                <div className="authform__input-field">
                    <label>Email address</label>
                    <input type="email" ref={emailRef} required ></input>
                </div>
                <div className="authform__input-field">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} required ></input>
                </div>
                <div className="authform__forgotpass"> <Link to="/forgot-password">Forgot your Password?</Link> </div>
                <div className="authform__input-field">
                    <button disabled={loading} type="Submit" className="authform__btn">Login</button>
                </div>
            </form>
            <div className="authform__direct">Need an account? <Link to="/signup">Signup</Link></div>
        </div>
    )
}

export default Login
