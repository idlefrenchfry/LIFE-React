import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

function Nav() {
    return (
        <nav>
            <a href=""><img src={logo} alt="Life" /></a>
            <div className="navlinks">
                <Link to="/">Dashboard</Link>
                <Link to="/Members">Members</Link>
                <Link to="/Coaches">Coaches</Link>
                <Link to="/Events">Events</Link>
                <Link to="/Training">Training</Link>
            </div>
        </nav>
    );
}

export default Nav;
