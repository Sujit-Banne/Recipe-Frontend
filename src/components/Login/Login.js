import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleLogin = (event) => {
        event.preventDefault();
        axios
            .post('https://recipe-app-backend-t1iy.onrender.com/login', {
                email,
                password,
            })
            .then((res) => {
                console.log(res);
                setToken(res.data.token);
                const data = {
                    token: res.data.token,
                };
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('token', JSON.stringify(data));
                navigate('/');
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            {error && <div className="login-error">{error}</div>}
            <button onClick={handleLogin} className="login-button">
                Login
            </button>
            <Link to="/register" className="login-link">
                Register
            </Link>
        </div>
    );
};

export default Login;
