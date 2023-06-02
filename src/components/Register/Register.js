import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/login');
        }
    }, [navigate]);

    const handleRegister = async () => {
        console.log(email, password, confirmPassword);
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(
                'https://recipe-app-backend-t1iy.onrender.com/register',
                {
                    email,
                    password,
                }
            );
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response));
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again later');
            }
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-heading">Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="register-input"
            />
            {error && <div className="register-error">{error}</div>}
            <button onClick={handleRegister} className="register-button">
                Register
            </button>
            <Link to="/login" className="register-link">
                Login
            </Link>
        </div>
    );
};

export default Register;
