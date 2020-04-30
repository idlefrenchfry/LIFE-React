import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <NavLink to="/Dashboard"><img src="/logo.png" alt="Life" /></NavLink>
            <div className="navlinks">
                <NavLink exact={true} activeClassName='activelink' to="/Dashboard">Dashboard</NavLink>
                <NavLink activeClassName='activelink' to="/Members">Members</NavLink>
                <NavLink activeClassName='activelink' to="/Coaches">Coaches</NavLink>
                <NavLink activeClassName='activelink' to="/Events">Events</NavLink>
                <NavLink activeClassName='activelink' to="/Trainings">Trainings</NavLink>
            </div>
        </nav>
    );
}

function Nav(props) {
    if (props.location.pathname === "/")
        return null;
    else
        return <NavBar />
}

export default Nav;
