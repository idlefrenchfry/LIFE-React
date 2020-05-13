import React, { useEffect, useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import { cloneDeep } from 'lodash';

let coachesList = [
    {
        id: 40,
        name: "Lynsey Atherton",
        sports: "Basketball",
        contact: "+65 9284 2718"
    },
    {
        id: 41,
        name: "Sullivan Guy",
        sports: "Badminton",
        contact: "+65 8247 0284"
    },
    {
        id: 42,
        name: "Raees Chapman",
        sports: "Football",
        contact: "+65 9399 8473"
    },
    {
        id: 43,
        name: "Varun Wagstaff",
        sports: "Archery",
        contact: "+65 8174 2023"
    },
    {
        id: 44,
        name: "Jagoda Martins",
        sports: "Badminton",
        contact: "+65 9385 1932"
    },
    {
        id: 45,
        name: "Augustus Rhodes",
        sports: "Badminton",
        contact: "+65 9596 3393"
    },
    {
        id: 46,
        name: "Bae Joohyun",
        sports: "Football",
        contact: "+65 9381 3590"
    },
    {
        id: 47,
        name: "Layan Ferrell",
        sports: "Table Tennis",
        contact: "+65 8182 2948"
    },
    {
        id: 48,
        name: "Farrell Deleon",
        sports: "Table Tennis",
        contact: "+65 8949 3929"
    },
    {
        id: 49,
        name: "Kang Seulgi",
        sports: "Badminton",
        contact: "+65 8293 9424"
    },
    {
        id: 50,
        name: "Park Sooyoung",
        sports: "Basketball",
        contact: "+65 9295 7377"
    },
    {
        id: 51,
        name: "Shaurya Lucero",
        sports: "Badminton",
        contact: "+65 9173 7739"
    },
]

function Coaches() {
    /*==================== Filter states ====================*/
    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/
        
    // set coaches
    const [originalCoaches, setOriginalCoaches] = useState([]);

    // async function to fetch coaches and set them
    function fetchCoaches() {
        let data = cloneDeep(coachesList);
        setOriginalCoaches(data);
    }

    // useEffect to call async function
    useEffect(() => {
        fetchCoaches();
    }, []);

    // set coaches to display
    const [coaches, setCoaches] = useState([]);

    useLayoutEffect(() => {
        let data = cloneDeep(originalCoaches);
        if (data.length) {

            if (searchInput) {
                data = data.filter(coach => {
                    let values = Object.values(coach);
                    for (let i = 0; i < values.length; i++) {
                        if (values[i].toString().toUpperCase().includes(searchInput.toUpperCase()))
                            return true;
                    }

                    return false;
                });
            }

            if (sportsFilter)
                data = data.filter(coach => coach.sports.toUpperCase() === sportsFilter.toUpperCase());
        }

        setCoaches(data);
    }, [originalCoaches, sportsFilter, searchInput])

    // Handle change for sports filter
    const handleSportsFilter = (e) => setSportsFilter(e.target.value);

    // Handle change for search input
    const handleSearchInput = (e) => setSearchInput(e.target.value);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Coaches</h1>
                <ButtonsSet module={"Coaches"} dataToExport={coaches} addPage="/Coaches/Add" />
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
            {
                coaches.length !== 0 ?
                    <Table
                        data={coaches}
                        columns={Object.keys(coaches[0])}
                        detailsPage={"Coaches/"}
                        thBool={true} /> :
                    <p>Loading...</p>
            }
        </div>
    );
}

export default Coaches;
