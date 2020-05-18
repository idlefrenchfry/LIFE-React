import React, { useEffect, useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import trainingsList from './data/Trainings.json';
import coachesList from './data/Coaches.json';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

// let trainingsList = [
//     {
//         id: 18,
//         name: "Archery Training",
//         sports: "Archery",
//         coach: "Varun Wagstaff",
//         date: "2020-01-22T16:00:00.000Z",
//         sessions: 10,
//         publishStatus: true
//     },
//     {
//         id: 19,
//         name: "Basketball Trainings",
//         sports: "Basketball",
//         coach: "Lynsey Atherton",
//         sessions: 12,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 20,
//         name: "Football Traiing",
//         sports: "Football",
//         coach: "Raees Chapman",
//         sessions: 5,
//         date: "2020-01-22T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 21,
//         name: "Fun Badminton!",
//         sports: "Badminton",
//         coach: "Sullivan Guy",
//         sessions: 4,
//         date: "2020-01-22T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 22,
//         name: "Badminton Training",
//         sports: "Badminton",
//         coach: "Jagoda Martins",
//         sessions: 13,
//         date: "2020-01-24T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 23,
//         name: "Archery Training",
//         sports: "Archery",
//         coach: "Varun Wagstaff",
//         sessions: 19,
//         date: "2020-01-31T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 24,
//         name: "Sports Festival",
//         sports: "Table Tennis",
//         coach: "Farrell Deleon",
//         sessions: 2,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 25,
//         name: "Pro Badminton",
//         sports: "Badminton",
//         coach: "Sullivan Guy",
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 26,
//         name: "Football Traiing",
//         sports: "Football",
//         coach: "Bae Joohyun",
//         sessions: 8,
//         date: "2020-01-31T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 27,
//         name: "Football Traiing",
//         sports: "Football",
//         coach: "Raees Chapman",
//         sessions: 9,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 28,
//         name: "Basketball Trainings",
//         sports: "Basketball",
//         coach: "Lynsey Atherton",
//         sessions: 12,
//         date: "2020-01-24T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 29,
//         name: "Pro Basketball",
//         sports: "Basketball",
//         coach: "Lynsey Atherton",
//         sessions: 15,
//         date: "2020-01-24T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 30,
//         name: "Sports Festival",
//         sports: "Table Tennis",
//         coach: "Layan Ferrell",
//         sessions: 6,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 31,
//         name: "Fun With Archery!",
//         sports: "Archery",
//         coach: "Varun Wagstaff",
//         sessions: 7,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: false
//     },
//     {
//         id: 32,
//         name: "Sports Festival",
//         sports: "Table Tennis",
//         coach: "Layan Ferrell",
//         sessions: 1,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 33,
//         name: "Badminton Training",
//         sports: "Badminton",
//         coach: "Kang Seulgi",
//         sessions: 12,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: true
//     },
//     {
//         id: 34,
//         name: "Fun with Basketball!",
//         sports: "Basketball",
//         sessions: 12,
//         date: "2020-04-22T16:00:00.000Z",
//         publishStatus: true
//     },
// ]

function Trainings() {
        
    /*==================== Filter states ====================*/
    // Keep track of current tab (Published, past, unpublished)
    const [currentTab, setCurrentTab] = useState("past");

    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/

    const [isBusy, setIsBusy] = useState(true);

    // set original trainings
    const [originalTrainings, setOriginalTrainings] = useState([]);

    // useEffect to call function that fetches and sets trainings
    useEffect(() => {
        let data = cloneDeep(trainingsList);
        for (let i = 0; i < data.length; i++)
            data[i].sessions = data[i].sessions.length;
        setOriginalTrainings(data);
        setIsBusy(false)
    }, []);

    // set trainings to be used for display
    const [trainings, setTrainings] = useState([]);

    // Display trainings based on current section and filters
    useLayoutEffect(() => {
        let copyData = cloneDeep(originalTrainings);

        // if no data in array, don't run remaining lines in effect
        if (copyData.length) {
            // Filter the data based on current tab
            // if tab is published or unpublished
            if (currentTab === "published" || currentTab === "unpublished") {
                let publishBool = (currentTab === "published");
                copyData = copyData.filter(training => training.publishStatus === publishBool);
            }

            // If tab is past
            else {
                let today = new Date().getTime();
                copyData = copyData.filter(event => {
                    let dateInMili = Date.parse(event.date);
                    return dateInMili < today;
                })
            }

            // Loop through to delete date and publish status
            for (let i = 0; i < copyData.length; i++) {
                delete copyData[i].date;
                delete copyData[i].publishStatus; // Don't need to display published status
            }

            // Filter the data based on search input
            if (searchInput !== "") {
                copyData = copyData.filter(training => {
                    let values = Object.values(training);
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

        setTrainings(copyData);
    }, [originalTrainings, sportsFilter, searchInput, currentTab]);

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
                <h1>Trainings</h1>
                <ButtonsSet module={"Trainings"} dataToExport={Trainings} addPage="/Training/Add" />
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
                         trainings.length !== 0 ?
                         <Table
                            data={trainings}
                            columns={{"name": "Name", "sports": "Sports", "sessions": "Sessions"}}
                            detailsPage={"Trainings/Edit/"}
                            thBool={true} /> :
                         <p>No {currentTab} trainings to display</p>
                    )
            }
        </div>
    );
}

export default Trainings;
