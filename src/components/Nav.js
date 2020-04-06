import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

function Nav() {
    return (
        <nav>
            <Link to="/"><img src={logo} alt="Life" /></Link>
            <div className="navlinks">
                <Link to="/">Dashboard</Link>
                <Link to="/Members">Members</Link>
                <Link to="/Coaches">Coaches</Link>
                <Link to="/Events">Events</Link>
                <Link to="/Trainings">Trainings</Link>
            </div>
        </nav>
    );
}

export default Nav;
