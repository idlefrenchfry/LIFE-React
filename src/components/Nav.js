import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <NavLink to="/Dashboard"><img src="/logo.png" alt="Life" /></NavLink>
            <div className="navlinks">
                <NavLink exact={true} activeClassName='activelink' to="/Dashboard"><i className="fas fa-chart-bar" /><span>Dashboard</span></NavLink>
                <NavLink activeClassName='activelink' to="/Members"><i className="fas fa-user" /><span>Members</span></NavLink>
                <NavLink activeClassName='activelink' to="/Coaches"><i className="fas fa-user-tie" /><span>Coaches</span></NavLink>
                <NavLink activeClassName='activelink' to="/Events"><i className="fas fa-bookmark" /><span>Events</span></NavLink>
                <NavLink activeClassName='activelink' to="/Trainings"><i className="fas fa-dumbbell" /><span>Trainings</span></NavLink>
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
