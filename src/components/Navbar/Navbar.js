import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const home = () => {
        navigate('/');
    };

    const add = () => {
        navigate('/add');
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {auth ? (
                    <li>
                        <Link to='/' onClick={home}>Home</Link>
                        <Link to='/add' onClick={add}>Add Recipe</Link>
                        <Link to="/login" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>

                    </>
                )}
            </ul>
        </nav>
    );
}
