import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';

function Nav() {
    return (
        <nav>
            <NavLink to="/"><img src={logo} alt="Life" /></NavLink>
            <div className="navlinks">
                <NavLink exact={true} activeClassName='activelink' to="/">Dashboard</NavLink>
                <NavLink activeClassName='activelink' to="/Members">Members</NavLink>
                <NavLink activeClassName='activelink' to="/Coaches">Coaches</NavLink>
                <NavLink activeClassName='activelink' to="/Events">Events</NavLink>
                <NavLink activeClassName='activelink' to="/Trainings">Trainings</NavLink>
            </div>
        </nav>
    );
}

export default Nav;
