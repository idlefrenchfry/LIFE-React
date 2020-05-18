import React, { useEffect, useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import { ISOStringToDate } from '../CommonFunctions';
import { formatAMPM } from '../CommonFunctions.js';
import eventsList from './data/Events.json'
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

function Events() {
    /*==================== Filter states ====================*/
    // Keep track of current tab (Published, past, unpublished)
    const [currentTab, setCurrentTab] = useState("past");

    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/

    const [isBusy, setIsBusy] = useState(true);
    
    // set original events
    const [originalEvents, setOriginalEvents] = useState([]);

    // fetches and sets events
    useEffect(() => {
        let data = cloneDeep(eventsList);
        setOriginalEvents(data);
        setIsBusy(false)
    }, []);

    // set events to be used for display
    const [events, setEvents] = useState([]);

    // Display events based on current section and filters
    useLayoutEffect(() => {
        let copyData = cloneDeep(originalEvents);

        // if no data in array, don't run remainined lines in effect
        if (copyData.length) {
            // Filter the data based on current tab
            // if tab is published or unpublished
            if (currentTab === "published" || currentTab === "unpublished") {
                let publishBool = (currentTab === "published");
                copyData = copyData.filter(event => event.publishStatus === publishBool);
            }

            // If tab is past
            else {
                let today = new Date().getTime();
                copyData = copyData.filter(event => {
                    let dateInMili = Date.parse(event.endDate);
                    return dateInMili < today;
                })
            }

            // Loop through to get date and time properties through ISO string
            for (let i = 0; i < copyData.length; i++) {
                let date = ISOStringToDate(copyData[i].startDate);
                copyData[i].startDate = date.toDateString();
                copyData[i].time = formatAMPM(date);

                delete copyData[i].publishStatus; // Don't need to display published status
            }

            // Filter the data based on search input
            if (searchInput !== "") {
                copyData = copyData.filter(event => {
                    let values = Object.values(event);
                    for (let i = 0; i < values.length; i++) {
                        if (values[i].toString().toUpperCase().includes(searchInput.toUpperCase()))
                            return true;
                    }

                    return false;
                });
            }

            // Filter the data based on sports filter
            if (sportsFilter !== "")
                copyData = copyData.filter(event => event.sports.toUpperCase() === sportsFilter.toUpperCase());
        }

        setEvents(copyData);
    }, [originalEvents, sportsFilter, searchInput, currentTab]);

    // Change style of tab depending on current section
    const displayTab = (tab) => {
        if (tab === currentTab)
            return "currentTab noselect";
        return "";
    }
    
    // Change current tab state
    const changeTab = (e) => {
        setCurrentTab(e.target.id);
    }

    // Handle change for sports filter
    const handleSportsFilter = (e) => setSportsFilter(e.target.value);

    // Handle change for search input
    const handleSearchInput = (e) => setSearchInput(e.target.value);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Events</h1>
                <ButtonsSet module={"Events"} dataToExport={events} addPage="/Events/Add" />
            </div>

            <div className="filters">
                <h4>Filters</h4>
                <select onChange={handleSportsFilter}>
                    <option value="">Sports</option>
                    <option value="archery">Archery</option>
                    <option value="badminton">Badminton</option>
                    <option value="basketball">Basketball</option>
                    <option value="football">Football</option>
                    <option value="table tennis">Table Tennis</option>
                </select>

                <span><input onChange={handleSearchInput} placeholder="Search" type="text" /></span>
            </div>

            <div className="sections">
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("published")} id="published">Published</span>
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("past")} id="past">Past</span>
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("unpublished")} id="unpublished">Unpublished</span>
            </div>
            {
                isBusy ? 
                    <div className="loadingDiv">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </div> : (
                         events.length !== 0 ?
                         <Table
                            data={events}
                            columns={{"name": "Name", "sports": "Sports", "startDate": "Date", "startTime": "Time"}}
                            detailsPage={"Events/"}
                            thBool={true} /> :
                         <p>No {currentTab} events to display</p>
                    )
            }
        </div>
    );
}

export default Events;
