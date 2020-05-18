import React, { useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import { formatAMPM, ISOStringToDate, getDayName, getMonthName } from '../CommonFunctions';
import membersList from './data/Members.json';
import eventsList from './data/Events.json';

function EventDetails(props) {

    // Keep track of which section to display
    const [currentFilter, setCurrentFilter] = useState("going");

    // current state of fetching event
    const [eventsFetchState, setEventsFetchState] = useState("fetching");

    // Cancelled Members
    const [eventDetails, setEventDetails] = useState({});

    useLayoutEffect(() => {
        let events = eventsList;
        let filterEvent = events.filter((event) => event.id === parseInt(props.match.params.id));
        if (filterEvent.length === 1) {
            setEventDetails(filterEvent[0])
            setEventsFetchState("fetched");
        }

        else
            setEventsFetchState("failed");
    }, [props.match.params.id])

    // Going Members
    const [goingMem, setGoingMem] = useState([]);
    // Cancelled Members
    const [cancelMem, setCancelMem] = useState([]);

    useLayoutEffect(() => {
        if (eventsFetchState === "fetched") {
            // fetch members
            let members = membersList;
            let going = members.filter((member) => eventDetails.memGoing.includes(member.id));
            let cancel = members.filter((member) => eventDetails.memCancelled.includes(member.id));
            setGoingMem(going);
            setCancelMem(cancel);
        }
    }, [eventsFetchState])

    // onClick function to execute when changing section
    const changeFilter = (e) => {
        if (e.target.getAttribute("filter-value") !== currentFilter)
            setCurrentFilter(e.target.getAttribute("filter-value"));
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (id === currentFilter)
            return "currentTab noselect upperButton";
        else
            return "noselect upperButton";
    }

    const exportList = () => {
        console.log("Export list of members.")
    };

    const editDetails = () => window.location.href = "/Events/Edit/" + props.match.params.id;

    let startDate, endDate = "";
    if (eventsFetchState === "fetched") {
        startDate = ISOStringToDate(eventDetails.startDate);
        endDate = ISOStringToDate(eventDetails.endDate);
    }

    console.log("id:", props.match.params.id);

    if (eventsFetchState === "fetched") {
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
                    <img alt="event thumbnail" src="https://i.ytimg.com/vi/XplrxSSrja0/maxresdefault.jpg" />
                    <div>
                        <span className="eventDate">{getDayName(startDate.getDay())}, {startDate.getDate()} {getMonthName(startDate.getMonth())} {startDate.getFullYear()} </span> {/* MON, 6 Mar 2020 */}
                        <span className="eventTime">{formatAMPM(eventDetails.startTime)} - {formatAMPM(eventDetails.endTime)}</span>
                        <br />
                        <span className="eventLocation">{eventDetails.name}</span>
                        <br />
                        <span className="eventMemb">{goingMem.length} Members Going</span>
                        <br />
                        <span className="eventStatus">{eventDetails.publishStatus ? "Published" : "Unpublished"}</span>
                    </div>
                </div>
    
                <div className="sections midEvents">
                    <span onClick={changeFilter} className={displayTab("going")} filter-value="going">Going</span>
                    <span onClick={changeFilter} className={displayTab("cancelled")} filter-value="cancelled">Cancelled</span>
                    <span onClick={exportList} className="upperButton">Export List</span>
                </div>
    
                <div>
                    <DisplayTable 
                        columns={currentFilter === "going" ? goingMem : cancelMem}
                        status={currentFilter === "going" ? "going" : "cancelled"}
                    />
                </div>
            </div>
        );
    }

    else if (eventsFetchState === "fetching") {
        return (
            <div className="card">
                <div className="loadingDiv">
                    <i className="fas fa-circle-notch fa-spin"></i>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="card">
                <div>Failed to fetch event</div>
            </div>
        )
    }
}

function DisplayTable(props) {
    if (props.columns.length === 0) {
        if (props.status === "going")
            return <div style={{padding:"20px", paddingLeft:"0"}}>No members have joined yet.</div>;
        else
            return <div style={{padding:"20px", paddingLeft:"0"}}>No members have cancelled.</div>;
    } else {
        return <Table
                    data={props.columns}
                    columns={{"name":"Name", "sports":"Sports", "mobileNo":"Contact", "role": "Status"}}
                    detailsPage={"Members/"}
                    thBool={false} 
                />
    }
}

export default EventDetails;
