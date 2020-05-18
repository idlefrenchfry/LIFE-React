import React, { useEffect, useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import users from './data/Coaches.json';
import { cloneDeep } from 'lodash';

function Coaches() {
    /*==================== Filter states ====================*/
    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/

    const [isBusy, setIsBusy] = useState(true);

    // set coaches
    const [originalCoaches, setOriginalCoaches] = useState([]);

    // async function to fetch coaches and set them
    function fetchCoaches() {
        // let data = cloneDeep(coachesList);
        let data = cloneDeep(users);
        setOriginalCoaches(data);
        setIsBusy(false);
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
                isBusy ? 
                    <div className="loadingDiv">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </div> : (
                         coaches.length !== 0 ?
                         <Table
                            data={coaches}
                            columns={{"name": "Name", "sports": "Sports", "mobileNo": "Contact"}}
                            detailsPage={"Coaches/"}
                            thBool={true} /> :
                         <p>No coaches to display</p>
                    )
            }
        </div>
    );
}

export default Coaches;
