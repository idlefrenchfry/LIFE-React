import React, { useEffect, useState, useLayoutEffect } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import { cloneDeep } from 'lodash';
import users from './data/Members.json';

function Members() {
    console.log(users);
    /*==================== Filter states ====================*/
    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current status filter
    const [statusFilter, setStatusFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/

    const [isBusy, setIsBusy] = useState(true);

    // set original members
    const [originalMembers, setOriginalMembers] = useState([]);

    // async function to fetch coaches and set them
    function fetchMembers() {
        // let data = membersList
        let data = users;
        setOriginalMembers(data);
        setIsBusy(false);
    }

    // useEffect to call async function, called once at the start
    useEffect(() => {
        fetchMembers();
    }, []);

    // Set members to display
    const [members, setMembers] = useState([]);

    useLayoutEffect(() => {
        let data = cloneDeep(originalMembers);
        if (data.length) {
            if (searchInput) {
                data = data.filter(member => {
                    let values = Object.values(member);
                    for (let i = 0; i < values.length; i++) {
                        if (values[i].toString().toUpperCase().includes(searchInput.toUpperCase()))
                            return true;
                    }

                    return false;
                });
            }

            if (sportsFilter)
                data = data.filter(member => member.sports.toUpperCase() === sportsFilter.toUpperCase());

            if (statusFilter)
                data = data.filter(member => member.role.toUpperCase() === statusFilter.toUpperCase());
        }

        setMembers(data);
    }, [originalMembers, sportsFilter, statusFilter, searchInput]);

    // Handle change for sports filter
    const handleSportsFilter = (e) => setSportsFilter(e.target.value);

    // Handle change for status filter
    const handleStatusFilter = (e) => setStatusFilter(e.target.value);

    // Handle change for search input
    const handleSearchInput = (e) => setSearchInput(e.target.value);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Members</h1>
                <ButtonsSet module={"Members"} dataToExport={members} addPage="/Members/Add" />
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
                <select onChange={handleStatusFilter}>
                    <option value="">Status</option>
                    <option value="athlete">Athlete</option>
                    <option value="casual">Casual</option>
                </select>

                <span><input onChange={handleSearchInput} placeholder="Search" type="text" /></span>
            </div>
            {
                isBusy ? 
                    <div className="loadingDiv">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </div> : (
                         members.length !== 0 ?
                         <Table
                            data={members}
                            columns={{"name":"Name", "sports":"Sports", "mobileNo":"Contact", "role": "Status"}}
                            detailsPage={"Members/"}
                            thBool={true} /> :
                         <p>No members to display</p>
                    )
            }
        </div>
    );
}

export default Members;
