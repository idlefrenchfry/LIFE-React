import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

let trainingsList = [
    {
        name: "Archery Training",
        sports: "Archery",
        coach: "Varun Wagstaff",
        date: "2020-01-22T16:00:00.000Z",
        sessions: 10,
        publishStatus: true
    },
    {
        name: "Basketball Trainings",
        sports: "Basketball",
        coach: "Lynsey Atherton",
        sessions: 12,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Football Traiing",
        sports: "Football",
        coach: "Raees Chapman",
        sessions: 5,
        date: "2020-01-22T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Fun Badminton!",
        sports: "Badminton",
        coach: "Sullivan Guy",
        sessions: 4,
        date: "2020-01-22T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Badminton Training",
        sports: "Badminton",
        coach: "Jagoda Martins",
        sessions: 13,
        date: "2020-01-24T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Archery Training",
        sports: "Archery",
        coach: "Varun Wagstaff",
        sessions: 19,
        date: "2020-01-31T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Sports Festival",
        sports: "Table Tennis",
        coach: "Farrell Deleon",
        sessions: 2,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Pro Badminton",
        sports: "Badminton",
        coach: "Sullivan Guy",
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Football Traiing",
        sports: "Football",
        coach: "Bae Joohyun",
        sessions: 8,
        date: "2020-01-31T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Football Traiing",
        sports: "Football",
        coach: "Raees Chapman",
        sessions: 9,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Basketball Trainings",
        sports: "Basketball",
        coach: "Lynsey Atherton",
        sessions: 12,
        date: "2020-01-24T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Pro Basketball",
        sports: "Basketball",
        coach: "Lynsey Atherton",
        sessions: 15,
        date: "2020-01-24T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Sports Festival",
        sports: "Table Tennis",
        coach: "Layan Ferrell",
        sessions: 6,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Fun With Archery!",
        sports: "Archery",
        coach: "Varun Wagstaff",
        sessions: 7,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: false
    },
    {
        name: "Sports Festival",
        sports: "Table Tennis",
        coach: "Layan Ferrell",
        sessions: 1,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Badminton Training",
        sports: "Badminton",
        coach: "Kang Seulgi",
        sessions: 12,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: true
    },
    {
        name: "Fun with Basketball!",
        sports: "Basketball",
        sessions: 12,
        date: "2020-04-22T16:00:00.000Z",
        publishStatus: true
    },
]

function Trainings() {
        
    /*==================== Filter states ====================*/
    // Keep track of current tab (Published, past, unpublished)
    const [currentTab, setCurrentTab] = useState("past");

    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/

    // set original trainings
    const [originalTrainings, setOriginalTrainings] = useState([]);

    // useEffect to call async function that fetches and sets trainings
    useEffect(() => {
        let data = cloneDeep(trainingsList);
        setOriginalTrainings(data);
    }, []);

    // set trainings to be used for display
    const [trainings, setTrainings] = useState([]);

    // Display trainings based on current section and filters
    useEffect(() => {
        let copyData = cloneDeep(originalTrainings);

        // if no data in array, don't run remainined lines in effect
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
                <ButtonsSet module={"Trainings"} dataToExport={Trainings} />
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

                <input onChange={handleSearchInput} placeholder="Search" type="text" />
            </div>

            <div className="sections">
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("published")} id="published">Published</span>
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("past")} id="past">Past</span>
                <span onClick={changeTab} style={{ width: "30%" }} className={displayTab("unpublished")} id="unpublished">Unpublished</span>
            </div>
            {trainings.length !== 0 ? <Table data={trainings} columns={Object.keys(trainings[0])} /> : <p>Loading...</p>}
        </div>
    );
}

export default Trainings;
