import React from 'react';
import './Navbar.css'; // We'll style the navbar here

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <h1 className="logo">Shakespeare Sonnet</h1>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#minigame">Escape Room</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;