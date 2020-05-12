import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <NavLink to="/Dashboard"><img src="/logo.png" alt="Life" /></NavLink>
            <div className="navlinks">
                <NavLink exact={true} activeClassName='activelink' to="/Dashboard"><i class="fas fa-chart-bar" />Dashboard</NavLink>
                <NavLink activeClassName='activelink' to="/Members"><i class="fas fa-user" />Members</NavLink>
                <NavLink activeClassName='activelink' to="/Coaches"><i class="fas fa-user-tie" />Coaches</NavLink>
                <NavLink activeClassName='activelink' to="/Events"><i class="fas fa-bookmark" />Events</NavLink>
                <NavLink activeClassName='activelink' to="/Trainings"><i class="fas fa-dumbbell" />Trainings</NavLink>
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
