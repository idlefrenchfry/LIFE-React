import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';

let eventsList = []

function Events() {
        
    // set coaches
    const [events, setEvents] = useState([]);

    // async function to fetch coaches and set them
    function fetchEvents() {
        let data = eventsList;
        setEvents(data);
    }

    // useEffect to call async function
    useEffect(() => {
        fetchEvents();
    }, [eventsList]);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Events</h1>
                <ButtonsSet module={"Events"} dataToExport={events} />
            </div>
            {events.length !== 0 ? <Table data={events} columns={Object.keys(events[0])} /> : <p>Loading...</p>}
        </div>
    );
}

export default Events;
