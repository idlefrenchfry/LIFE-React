import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <div className="card errorPage">
            <h1 className="sign"><span className="fast-flicker">E</span>rror<span className="flicker"> 4</span>04</h1>
            <p>Seems like the page you've requested doesn't exist...</p>
            <Link to="/Dashboard">Go back to the dashboard</Link>
        </div>
    );
}

export default Error404;
