import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';
import { cloneDeep } from 'lodash';

//Dummy Data {Name, sports, contact number, status}
let membersList = [
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
    },
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
    },
]

function Members() {
    /*==================== Filter states ====================*/
    // Keep track of current sports filter
    const [sportsFilter, setSportsFilter] = useState("");

    // Keep track of current status filter
    const [statusFilter, setStatusFilter] = useState("");

    // Keep track of current search input
    const [searchInput, setSearchInput] = useState("");
    /*========================================================*/


    // set original members
    const [originalMembers, setOriginalMembers] = useState([]);

    // async function to fetch coaches and set them
    function fetchMembers() {
        let data = membersList;
        setOriginalMembers(data);
    }

    // useEffect to call async function, called once at the start
    useEffect(() => {
        fetchMembers();
    }, []);

    // Set members to display
    const [members, setMembers] = useState([]);

    useEffect(() => {
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
                data = data.filter(member => member.status.toUpperCase() === statusFilter.toUpperCase());
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
            {members.length !== 0 ? <Table data={members} columns={Object.keys(members[0])} /> : <p>Loading...</p>}
        </div>
    );
}

export default Members;
