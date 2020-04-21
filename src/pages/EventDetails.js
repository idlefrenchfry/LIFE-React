import React, { useState } from 'react';

function EventDetails(props) {

    // Keep track of which section to display
    const [currentFilter, setCurrentFilter] = useState("going");

    // onClick function to execute when changing section
    const changeFilter = (e) => {
        if (e.target.getAttribute("filter-value") !== currentFilter)
            setCurrentFilter(e.target.getAttribute("filter-value"));
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentFilter == "going")
            return "currentEventFilter noselect";
        else
            return "noselect";
    }

    const editDetails = () => window.location.href = "/Events";

    console.log("id:", props.match.params.id);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>View Event</h1>
                <div className="buttonsSet">
                    <button onClick={editDetails} className="noselect">Back</button>
                    <button onClick={editDetails} className="noselect">Edit Details</button>
                </div>
            </div>

            <div className="eventDetails">
                <img src="https://i.ytimg.com/vi/XplrxSSrja0/maxresdefault.jpg" />
                <div>
                    <span className="eventDate">MON, 6 Mar 2020, </span>
                    <span className="eventTime">12:00m - 4:00pm</span>
                    <br />
                    <span className="eventLocation">Sports Festival</span>
                    <br />
                    <span className="eventMemb">10 Members Going</span>
                    <br />
                    <span className="eventStatus">Published</span>
                </div>
            </div>

            <div className="filterEvents">
                <span onClick={changeFilter} className={displayTab("1")} filter-value="going">Going</span>
                <span onClick={changeFilter} className={displayTab("2")} filter-value="cancelled">Cancelled</span>
            </div>

            <div>
            </div>
        </div>
    );
}

function Details(props) {
    return (
        <div className="detailsInfo">
            <span>{props.label}</span>
            <span>{props.value}</span>
        </div>
    );
}

export default EventDetails;
