import React, { useState } from 'react';
import Table from '../components/Table';
import { formatAMPM, ISOStringToDate, getDayName, getMonthName } from '../CommonFunctions';

const going = [
    {
        id: 20,
        name: "Kim Yerim",
        sports: "Archery",
        contact: "+65 9016 2738",
        status: "Casual"
    },
    {
        id: 21,
        name: "Kai Wong",
        sports: "Basketball",
        contact: "+65 8720 5116",
        status: "Casual"
    },
    {
        id: 22,
        name: "Hit Monlee",
        sports: "Football",
        contact: "+65 8732 2716",
        status: "Casual"
    },
    {
        id: 22,
        name: "Yi Tien",
        sports: "Archery",
        contact: "+65 9345 8491",
        status: "Casual"
    },
    {
        id: 23,
        name: "Prianka Letchmanan",
        sports: "Badminton",
        contact: "+65 8382 3490",
        status: "Athlete"
    },
    {
        id: 24,
        name: "Michael Henderson",
        sports: "Badminton",
        contact: "+65 9103 8204",
        status: "Athlete"
    }
]

const cancelled = [
    {
        id: 25,
        name: "Hae Chan",
        sports: "Basketball",
        contact: "+65 9384 0038",
        status: "Casual"
    },
    {
        id: 26,
        name: "Joshua Pei",
        sports: "Table Tennis",
        contact: "+65 9322 7028",
        status: "Casual"
    },
    {
        id: 27,
        name: "Clefairy Lee",
        sports: "Football",
        contact: "+65 8032 2010",
        status: "Ahtlete"
    },
    {
        id: 28,
        name: "Xue Ting",
        sports: "Badminton",
        contact: "+65 9284 2880",
        status: "Athlete"
    },
    {
        id: 29,
        name: "Amane Ichigo",
        sports: "Football",
        contact: "+65 9384 1031",
        status: "Casual"
    },
    {
        id: 30,
        name: "Seung Wan",
        sports: "Badminton",
        contact: "+65 8278 9283",
        status: "Athlete"
    }
]

const eventD = {
    startDate: "2020-08-06T04:00:00.000Z",
    endDate: "2020-08-06T08:00:00.000Z",
    name: "Sports Festival",
    publishStatus: true
}

function EventDetails(props) {

    // Keep track of which section to display
    const [currentFilter, setCurrentFilter] = useState("going");
    // Going Members
    const [goingMem, setGoingMem] = useState(going);
    // Cancelled Members
    const [cancelMem, setCancelMem] = useState(cancelled);
    // Cancelled Members
    const [eventDetails, setEventDetails] = useState(eventD);

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

    let startDate = ISOStringToDate(eventD.startDate);
    let endDate = ISOStringToDate(eventD.endDate);

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
                <img alt="event thumbnail" src="https://i.ytimg.com/vi/XplrxSSrja0/maxresdefault.jpg" />
                <div>
                    <span className="eventDate">{getDayName(startDate.getDay())}, {startDate.getDate()} {getMonthName(startDate.getMonth())} {startDate.getFullYear()} </span> {/* MON, 6 Mar 2020 */}
                    <span className="eventTime">{formatAMPM(startDate)} - {formatAMPM(endDate)}</span>
                    <br />
                    <span className="eventLocation">{eventD.name}</span>
                    <br />
                    <span className="eventMemb">{goingMem.length} Members Going</span>
                    <br />
                    <span className="eventStatus">{eventD.publishStatus ? "Published" : "Unpublished"}</span>
                </div>
            </div>

            <div className="sections midEvents">
                <span onClick={changeFilter} className={displayTab("going")} filter-value="going">Going</span>
                <span onClick={changeFilter} className={displayTab("cancelled")} filter-value="cancelled">Cancelled</span>
                <span onClick={exportList} className="upperButton">Export List</span>
            </div>

            <div>
                <Table
                    data={currentFilter === "going" ? goingMem : cancelMem}
                    columns={Object.keys(goingMem[0])}
                    detailsPage={"Members/"}
                    thBool={false} />
            </div>
        </div>
    );
}

export default EventDetails;
