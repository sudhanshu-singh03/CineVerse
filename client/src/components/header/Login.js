import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import "./Login.css";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit =/* async*/ (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{email, password})
        .then(result =>{console.log(result)
            alert("registered successfully")
            navigate('/log')
        })
        .catch(err => console.log(err))
    

     /*   try {
            if (isLogin) {
                const response = await axios.post('http://localhost:3001/signin', {
                    email,
                    password,
                });
                setMessage(response.data.message);
            } else {
                const response = await axios.post('http://localhost:3001/signup', {
                    email,
                    password,
                });
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }*/
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                required
                            />
                        </div>
                    )}
                    <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                </form>
                <p onClick={toggleForm}>
                    {isLogin ? 'New User? Sign Up here' : 'Already have an account? Sign In here'}
                </p>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;

