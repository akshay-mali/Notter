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
            history.push("/");
        }catch{
            setError("Failed to sign in.");
        }

        setLoading(false);
    }

    return (
        <div className="LoginForm">
            <h2>Login</h2>
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
                    <button disabled={loading} type="Submit" >Login</button>
                </div>
            </form>
            <div> <Link to="/forgot-password">Forgot Password?</Link> </div>
            <div>Need an account? <Link to="/signup">Signup</Link></div>
        </div>
    )
}

export default Login
